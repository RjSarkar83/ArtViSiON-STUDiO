# Optional ArtViSiON local print engine

The browser Converter works without this folder. This engine is optional and is used for advanced local conversions (including supported CDR/AI/EPS workflows and ICC CMYK TIFF). It runs only on your own computer. GitHub Pages cannot run Python itself.

## Start it

1. Install Python 3.10+ and the packages in `requirements.txt`:
   `python -m pip install -r requirements.txt`
2. Start the engine from this folder:
   - Windows: double-click `run_local.bat` or run `python app.py`
   - macOS/Linux: run `bash run_local.sh` or `python app.py`
3. In ArtViSiON Studio, open **Converter → PDF Converter**, expand **Optional desktop print engine**, enable it, and use `http://127.0.0.1:5000`.

For best results on proprietary / print formats, install the OS tools listed in `OFFLINE.md` (Ghostscript, LibreOffice, and Potrace where applicable). CDR/AI conversion is not a promise of 1:1 Corel/Adobe rendering; inspect output before production.

The web UI processes standard browser formats locally; background-removal model files are fetched from the configured public model CDN on first use. The optional server is local and adds permissive CORS for the Studio page.
