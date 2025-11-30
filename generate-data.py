#!/usr/bin/env python3
"""
Script para generar datos de marcas y productos desde assets/
Este script debe ejecutarse cada vez que cambien los productos en assets/
"""

import json
import os
from pathlib import Path

# Ruta base del proyecto
BASE_DIR = Path(__file__).parent.parent
ASSETS_DIR = BASE_DIR / "assets"
WEB_DIR = BASE_DIR / "WEB"

# Marcas configuradas con usuarios y contraseñas
BRANDS_CONFIG = {
    "Zara": {"email": "admin@zara.com", "password": "zara2025"},
    "Coosy": {"email": "admin@coosy.com", "password": "coosy2025"},
    "Eme Studios": {"email": "admin@emestudios.com", "password": "eme2025"},
    "Nicoli": {"email": "admin@nicoli.com", "password": "nicoli2025"},
    "Mango": {"email": "admin@mango.com", "password": "mango2025"},
    "Massimo Dutti": {"email": "admin@massimodutti.com", "password": "massimo2025"},
    "Nude Project": {"email": "admin@nudeproject.com", "password": "nude2025"},
    "Scalpers": {"email": "admin@scalpers.com", "password": "scalpers2025"},
    "Sophie and Lucie": {"email": "admin@sophieandlucie.com", "password": "sophie2025"},
    "The IQ Collection": {"email": "admin@theiqcollection.com", "password": "iqcollection2025"},
    "Utopya": {"email": "admin@utopya.com", "password": "utopya2025"},
    "ba&sh": {"email": "admin@ba-sh.com", "password": "bash2025"},
    "Ramsos": {"email": "admin@ramsos.com", "password": "ramsos2025"},
    "Goated Link": {"email": "admin@goatedlink.com", "password": "goated2025"},
    "New Balance": {"email": "admin@newbalance.com", "password": "newbalance2025"},
}


def load_products_from_assets():
    """Carga todos los productos desde assets/productos/"""
    products = []
    productos_dir = ASSETS_DIR / "productos"

    if not productos_dir.exists():
        print(f"❌ No existe el directorio: {productos_dir}")
        return products

    for brand_dir in productos_dir.iterdir():
        if not brand_dir.is_dir():
            continue

        brand_name = brand_dir.name

        for product_dir in brand_dir.iterdir():
            if not product_dir.is_dir():
                continue

            info_file = product_dir / "info.json"
            if not info_file.exists():
                continue

            try:
                with open(info_file, 'r', encoding='utf-8') as f:
                    product_info = json.load(f)

                # Encontrar todas las imágenes
                fotos_dir = product_dir / "fotos"
                images = []
                if fotos_dir.exists():
                    for img in sorted(fotos_dir.iterdir()):
                        if img.suffix.lower() in ['.jpg', '.jpeg', '.png']:
                            # Ruta relativa desde public/ (para que funcione en React como /assets/...)
                            rel_path = f"/assets/productos/{brand_name}/{product_dir.name}/fotos/{img.name}"
                            images.append(rel_path)

                # Logo de la marca
                logo_path = f"/assets/logos/{brand_name}.png"

                # Crear objeto producto compatible con la app
                product = {
                    "id": product_info.get("item_id", product_dir.name),
                    "brand": brand_name,
                    "title": product_info.get("nombre", product_dir.name),
                    "price": product_info.get("precio", 0),
                    "sizes": product_info.get("tallas", []),
                    "imagePaths": images,
                    "logoPath": logo_path,
                    "category": product_info.get("categoria"),
                    "subcategory": product_info.get("subcategoria"),
                    "description": product_info.get("descripcion"),
                    "relatedProductIDs": product_info.get("relacionados", []),
                    "color": product_info.get("color"),
                    "style": product_info.get("estilo"),
                    "material": product_info.get("material"),
                    "season": product_info.get("temporada"),
                    "targetAudience": product_info.get("publico_objetivo"),
                    "url": product_info.get("url"),
                    "stock": 50,  # Stock por defecto
                    "featured": False,
                    "active": True
                }

                products.append(product)
                print(f"✓ {brand_name}: {product['title']}")

            except Exception as e:
                print(f"❌ Error cargando {info_file}: {e}")

    return products


def generate_brands_data():
    """Genera el archivo de marcas con usuarios y contraseñas"""
    brands = []

    for brand_name, config in BRANDS_CONFIG.items():
        logo_path = f"assets/logos/{brand_name}.png"

        brand = {
            "id": brand_name.lower().replace(" ", "-").replace("&", "and"),
            "brandName": brand_name,
            "contactEmail": config["email"],
            "password": config["password"],
            "logoPath": logo_path,
            "role": "owner",
            "createdAt": "2025-01-01T00:00:00Z",
            "permissions": [
                "catalog.manage",
                "looks.manage",
                "bonuses.manage",
                "analytics.view",
                "settings.manage"
            ]
        }
        brands.append(brand)

    return brands


def main():
    print("🚀 Generando datos de Ponsiv Web...\n")

    # Cargar productos
    print("📦 Cargando productos...")
    products = load_products_from_assets()
    print(f"\n✓ Total productos: {len(products)}")

    # Generar datos de marcas
    print("\n🏢 Generando marcas...")
    brands = generate_brands_data()
    print(f"✓ Total marcas: {len(brands)}")

    # Guardar archivos JSON
    output_dir = WEB_DIR / "src" / "data"
    output_dir.mkdir(parents=True, exist_ok=True)

    # Guardar productos
    products_file = output_dir / "products.json"
    with open(products_file, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
    print(f"\n💾 Productos guardados en: {products_file}")

    # Guardar marcas
    brands_file = output_dir / "brands.json"
    with open(brands_file, 'w', encoding='utf-8') as f:
        json.dump(brands, f, ensure_ascii=False, indent=2)
    print(f"💾 Marcas guardadas en: {brands_file}")

    # Crear archivo de credenciales para referencia
    credentials_file = WEB_DIR / "CREDENTIALS.md"
    with open(credentials_file, 'w', encoding='utf-8') as f:
        f.write("# Credenciales de Acceso\n\n")
        f.write("## Marcas Pre-configuradas\n\n")
        f.write("| Marca | Email | Contraseña |\n")
        f.write("|-------|-------|------------|\n")
        for brand in sorted(brands, key=lambda x: x['brandName']):
            f.write(f"| {brand['brandName']} | {brand['contactEmail']} | {brand['password']} |\n")
    print(f"📋 Credenciales guardadas en: {credentials_file}")

    print("\n✅ ¡Completado!")


if __name__ == "__main__":
    main()
