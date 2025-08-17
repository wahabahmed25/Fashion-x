import os
import torch
import clip
from PIL import Image, UnidentifiedImageError
import numpy as np
import pickle
from sklearn.metrics.pairwise import cosine_similarity

# Device setup
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# Paths
DATASET_PATH = "dataset/img"
EMBEDDINGS_FILE = "dataset_embeddings.pkl"

# Map backend file path to frontend-accessible URL
def map_path_to_url(path):
    """
    Converts backend file path to URL served via StaticFiles.
    """
    rel_path = os.path.relpath(path, "dataset")  # relative to dataset folder
    return "/dataset/" + rel_path.replace("\\", "/")  # replace Windows backslashes

def compute_dataset_embeddings():
    """
    Walks the dataset folder recursively, encodes images with CLIP, 
    and saves embeddings to a pickle file.
    """
    embeddings = []
    image_paths = []

    for root, dirs, files in os.walk(DATASET_PATH):
        for img_name in files:
            if img_name.lower().endswith((".jpg", ".jpeg", ".png")):  # accept jpg/png
                img_path = os.path.join(root, img_name)
                try:
                    image = preprocess(Image.open(img_path)).unsqueeze(0).to(device)
                    with torch.no_grad():
                        vector = model.encode_image(image).cpu().numpy()[0]
                    embeddings.append(vector)
                    image_paths.append(img_path)
                except Exception as e:
                    print(f"Error processing {img_name}: {e}")

    embeddings = np.array(embeddings)
    with open(EMBEDDINGS_FILE, "wb") as f:
        pickle.dump({"embeddings": embeddings, "paths": image_paths}, f)

    print(f"Saved {len(image_paths)} embeddings to {EMBEDDINGS_FILE}")

def find_similar_images(upload_image_path, top_k=5):
    """
    Given a user-uploaded image, returns top_k most similar images from the dataset.
    Each returned image path is converted to a frontend-accessible URL.
    """
    # Load stored embeddings
    if not os.path.exists(EMBEDDINGS_FILE):
        raise FileNotFoundError(f"{EMBEDDINGS_FILE} not found. Run compute_dataset_embeddings() first.")

    with open(EMBEDDINGS_FILE, "rb") as f:
        data = pickle.load(f)
    embeddings = data["embeddings"]
    image_paths = data["paths"]

    # Encode uploaded image
    try:
        image = preprocess(Image.open(upload_image_path)).unsqueeze(0).to(device)
    except UnidentifiedImageError:
        raise ValueError("Uploaded file is not a valid image")

    with torch.no_grad():
        query_vector = model.encode_image(image).cpu().numpy()

    # Compute cosine similarity
    sims = cosine_similarity(query_vector, embeddings)[0]
    top_indices = sims.argsort()[::-1][:top_k]

    # Map paths to frontend URLs
    return [(map_path_to_url(image_paths[i]), float(sims[i])) for i in top_indices]
