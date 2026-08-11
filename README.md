# ARTIPHONERA v1

A static, portable starter site designed for free hosting on Cloudflare Pages.

## Included
- Responsive homepage
- Original ARTIPHONERA SVG logo and favicon
- 3 complete smartphone troubleshooting articles
- 3 working browser-based tools
- Search overlay
- About / Contact / Privacy / Terms / Disclaimer pages
- robots.txt and sitemap.xml templates
- ads.txt.example (safe placeholder only)

## Before publishing
1. Replace `YOUR-DOMAIN.example` in `robots.txt` and `sitemap.xml` with your final domain.
2. Add a real contact email.
3. Review legal/privacy pages for your actual services and region.
4. Add Google Analytics only after you have your real GA4 Measurement ID.
5. Add AdSense only after Google gives you your real Publisher ID.
6. When AdSense gives you the exact ads.txt line, create `/ads.txt` in the root using that exact line.
7. Do not copy the placeholder in `ads.txt.example`.

## Free deployment outline
1. Create a GitHub repository.
2. Upload everything inside this folder to the repository root.
3. In Cloudflare: Workers & Pages → Create → Pages → Connect to Git.
4. Select the repository.
5. For this static site, no build command is required. Output directory is the repository root.
6. Deploy.
7. Add your custom domain later in Cloudflare Pages → Custom domains.

## Multilingual expansion
Version 1 is English-first on purpose. Add reviewed translations gradually after the English pages are stable.
