import fitz
import requests
import os

os.makedirs('public/thumbnails', exist_ok=True)

papers = [
    {"id": 0, "title": "Attention Is All You Need", "arxiv": "1706.03762"},
    {"id": 1, "title": "BERT", "arxiv": "1810.04805"},
    {"id": 2, "title": "GPT-3", "arxiv": "2005.14165"},
    {"id": 3, "title": "LLaMA", "arxiv": "2302.13971"},
    {"id": 4, "title": "LoRA", "arxiv": "2106.09685"},
    {"id": 5, "title": "InstructGPT", "arxiv": "2203.02155"},
    {"id": 6, "title": "ResNet", "arxiv": "1512.03385"},
    {"id": 7, "title": "ViT", "arxiv": "2010.11929"},
    {"id": 8, "title": "DPO", "arxiv": "2305.18290"},
    {"id": 9, "title": "AlphaFold", "arxiv": "2107.03374"},
    {"id": 10, "title": "FlashAttention", "arxiv": "2205.14135"},
    {"id": 11, "title": "RT-2", "arxiv": "2307.15818"},
    {"id": 12, "title": "CLIP", "arxiv": "2103.00020"},
    {"id": 13, "title": "Diffusion", "arxiv": "2105.05233"},
    {"id": 14, "title": "QLoRA", "arxiv": "2305.14314"},
    {"id": 15, "title": "CoT", "arxiv": "2201.11903"},
    {"id": 16, "title": "ReAct", "arxiv": "2210.03629"},
    {"id": 17, "title": "RoBERTa", "arxiv": "1907.11692"},
    {"id": 18, "title": "PPO", "arxiv": "1707.06347"},
    {"id": 19, "title": "Segment Anything", "arxiv": "2304.02643"}
]

for p in papers:
    pdf_path = f"temp_{p['id']}.pdf"
    png_path = f"public/thumbnails/thumb_{p['id']}.png"
    
    if not os.path.exists(png_path):
        print(f"Downloading {p['title']}...")
        try:
            url = f"https://arxiv.org/pdf/{p['arxiv']}.pdf"
            headers = {'User-Agent': 'Mozilla/5.0'}
            response = requests.get(url, headers=headers)
            with open(pdf_path, 'wb') as f:
                f.write(response.content)
            
            doc = fitz.open(pdf_path)
            page = doc.load_page(0)
            pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5))
            pix.save(png_path)
            doc.close()
            os.remove(pdf_path)
            print(f"Saved {png_path}")
        except Exception as e:
            print(f"Failed {p['title']}: {e}")
