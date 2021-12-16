import os
import sys
import random
from typing import AsyncIterator

directory = r'./'

astro = [["img"],["vid"]]
city = [["img"],["vid"]]
misc = [["img"],["vid"]]
nature = [["img"],["vid"]]
sky_landscape = [["img"],["vid"]]
wildlife = [["img"],["vid"]]

for dir in os.listdir(directory):
    if dir == "astro":
        for filename in os.listdir(dir):
            if filename.endswith(".jpg") or filename.endswith(".ARW"):
                # print(os.path.join(dir, filename))
                astro[0].append(str(os.path.join(dir, filename)))
            if filename.endswith(".mp4"):
                astro[1].append(str(os.path.join(dir, filename)))
            else:
                continue
    elif dir == "city":
        for filename in os.listdir(dir):
            if filename.endswith(".jpg") or filename.endswith(".ARW"):
                # print(os.path.join(dir, filename))
                city[0].append(os.path.join(dir, filename))
            if filename.endswith(".mp4"):
                city[1].append(os.path.join(dir, filename))
            else:
                continue
    elif dir == "misc":
        for filename in os.listdir(dir):
            if filename.endswith(".jpg") or filename.endswith(".ARW"):
                # print(os.path.join(dir, filename))
                misc[0].append(os.path.join(dir, filename))
            if filename.endswith(".mp4"):
                misc[1].append(os.path.join(dir, filename))
            else:
                continue
    elif dir == "nature":
        for filename in os.listdir(dir):
            if filename.endswith(".jpg") or filename.endswith(".ARW"):
                # print(os.path.join(dir, filename))
                nature[0].append(os.path.join(dir, filename))
            if filename.endswith(".mp4"):
                nature[1].append(os.path.join(dir, filename))
            else:
                continue
    elif dir == "sky_landscape":
        for filename in os.listdir(dir):
            if filename.endswith(".jpg") or filename.endswith(".ARW"):
                # print(os.path.join(dir, filename))
                sky_landscape[0].append(os.path.join(dir, filename))
            if filename.endswith(".mp4"):
                sky_landscape[1].append(os.path.join(dir, filename))
            else:
                continue
    elif dir == "wildlife":
        for filename in os.listdir(dir):
            if filename.endswith(".jpg") or filename.endswith(".ARW"):
                # print(os.path.join(dir, filename))
                wildlife[0].append(os.path.join(dir, filename))
            if filename.endswith(".mp4"):
                wildlife[1].append(os.path.join(dir, filename))
            else:
                continue
    else:
        continue

# print(astro)
# print(city)
# print(misc)
# print(nature)
# print(sky_landscape)
# print(wildlife)

def explorationGallery():
    f = open("gallery_items.html", "w")
    f.write("<div class=\"row\">")
    f.close()
    f = open("gallery_items.html", "a")
    for i in astro[0]:
        if i == "img": continue
        f.write("""
        <div class="column astro">
        <div class="content">
        """)
        f.write("       <img src=\"" + i + "\" alt=\"astro\">") 
        f.write("""
        </div>
        </div>
        """)
    for i in city[0]:
        if i == "img": continue
        f.write("""
        <div class="column city">
        <div class="content">
        """)
        f.write("       <img src=\"" + i + "\" alt=\"city\">") 
        f.write("""
        </div>
        </div>
        """)
    for i in misc[0]:
        if i == "img": continue
        f.write("""
        <div class="column misc">
        <div class="content">
        """)
        f.write("       <img src=\"" + i + "\" alt=\"misc\">") 
        f.write("""
        </div>
        </div>
        """)
    for i in nature[0]:
        if i == "img": continue
        f.write("""
        <div class="column nature">
        <div class="content">
        """)
        f.write("       <img src=\"" + i + "\" alt=\"nature\">") 
        f.write("""
        </div>
        </div>
        """)
    for i in sky_landscape[0]:
        if i == "img": continue
        f.write("""
        <div class="column sky_landscape">
        <div class="content">
        """)
        f.write("       <img src=\"" + i + "\" alt=\"sky_landscape\">") 
        f.write("""
        </div>
        </div>
        """)
    for i in wildlife[0]:
        if i == "img": continue
        f.write("""
        <div class="column wildlife">
        <div class="content">
        """)
        f.write("       <img src=\"" + i + "\" alt=\"wildlife\">") 
        f.write("""
        </div>
        </div>
        """)

    f.write("</div>")
    f.close()

def identifier(image):
    if "astro" in image:
        return "astro"
    elif "city" in image:
        return "city"
    elif "misc" in image:
        return "misc"
    elif "nature" in image:
        return "nature"
    elif "sky_landscape" in image:
        return "sky_landscape"
    elif "wildlife" in image:
        return "wildlife"
    else:
        return "misc"

def flatten(t):
    return [item for sublist in t for item in sublist]

def vidOrPhoto(mediaItem):
    global mediaListSep
    if mediaItem in mediaListSep[1]:
        return """
        <a href="photography\\""" + mediaItem +  """" target="_blank">
            <video alt=\"""" + mediaItem + """"class=\"""" + identifier(mediaItem) + """ media\" autoplay loop> <source src="photography\\""" + mediaItem +  """" type="video/mp4"> </video>
        </a>
        """
    else:
        return """
        <a href="photography\\""" + mediaItem +  """" target="_blank">
            <img src="photography\\""" + mediaItem +  """" alt=\"""" + mediaItem + """"class=\"""" + identifier(mediaItem) + """ media">
        </a>
        """

def ResponsiveGallery(doVideo = False, doRandom = False, doCaption = False):
    global mediaListSep 
    mediaListSep = [astro[0][1:] + city[0][1:] + misc[0][1:] + nature[0][1:] + sky_landscape[0][1:] + wildlife[0][1:], astro[1][1:] + city[1][1:] + misc[1][1:] + nature[1][1:] + sky_landscape[1][1:] + wildlife[1][1:]]

    if doVideo:
        mediaList = mediaListSep[0] + mediaListSep[1]
    else:
        mediaList = mediaListSep[0]
    if doRandom: 
        random.shuffle(mediaList)
    mediaInt = len(mediaList)


    f = open("gallery_items.html", "w")
    f.write("""
    <div id=\"master\">
    <style scoped>
        @import url("{{ '/assets/css/gallery.css?v=' | append: site.github.build_revision | relative_url }}");
    </style>
    """)
    f.close()
    f = open("gallery_items.html", "a")
    pos = 0

    while True:
        try:
            if not doCaption:
                f.write(vidOrPhoto(mediaList[pos]))
            else:
                f.write("""
                <div class="colElement">
                    <p class="caption">""" + mediaList[pos] + """</p>
                """)
                f.write(vidOrPhoto(mediaList[pos]))
                f.write("</div>")
            
            pos += 1
        except IndexError:
            break

    f.write("""
    <script src="{{ '/assets/js/gallery.js' | relative_url }}"></script>
    </div>
    """)
    f.close()

# explorationGallery()
# ResponsiveGallery(doVideo, doRandom, doCaption)
ResponsiveGallery(True, True, False)