import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace img tags src
def repl_img(match):
    tag = match.group(0)
    return re.sub(r'\.(PNG|png)(["\'\?])', r'.webp\2', tag)

content = re.sub(r'<img[^>]+>', repl_img, content)

# Replace poster
def repl_poster(match):
    return re.sub(r'\.(PNG|png)', r'.webp', match.group(0))

content = re.sub(r'poster="images/[^"]+"', repl_poster, content)

# Preload LCP link
content = content.replace('href="images/hero-main.PNG"', 'href="images/hero-main.webp"')

# Hero video media condition for mobile performance
content = content.replace(
    '<source src="videos/hero-video.mp4" type="video/mp4">',
    '<source src="videos/hero-video.mp4" type="video/mp4" media="(min-width: 768px)">'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated index.html to WebP successfully!')
