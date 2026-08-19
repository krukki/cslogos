import os
import re

paginas_dir = "pages"

if os.path.exists(paginas_dir):
    for f in os.listdir(paginas_dir):
        if f.endswith(".html"):
            caminho = os.path.join(paginas_dir, f)
            with open(caminho, "r", encoding="utf-8") as file:
                conteudo = file.read()

            # Corrige href="index.html" ou href="pages/index.html" para href="../index.html"
            conteudo_corrigido = re.sub(
                r'href=["\'](?:pages/)?index\.html["\']',
                'href="../index.html"',
                conteudo
            )

            with open(caminho, "w", encoding="utf-8") as file:
                file.write(conteudo_corrigido)

    print("✨ Links de retorno corrigidos para ../index.html!")