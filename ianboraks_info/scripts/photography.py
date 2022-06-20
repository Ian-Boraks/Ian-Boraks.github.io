import os
import sys
import random
from typing import AsyncIterator

directory = r'../images/photography/'

print(directory)

astro = [["img"],["vid"]]
city = [["img"],["vid"]]
misc = [["img"],["vid"]]
nature = [["img"],["vid"]]
sky_landscape = [["img"],["vid"]]
wildlife = [["img"],["vid"]]

for dir in os.listdir(directory):
  print(dir)
  if dir == "astro":
      for filename in os.listdir(directory + dir):
          if filename.endswith(".jpg") or filename.endswith(".ARW"):
              # print(os.path.join(dir, filename))
              astro[0].append(str(os.path.join(dir, filename)))
          if filename.endswith(".mp4"):
              astro[1].append(str(os.path.join(dir, filename)))
          else:
              continue
  elif dir == "city":
      for filename in os.listdir(directory + dir):
          if filename.endswith(".jpg") or filename.endswith(".ARW"):
              # print(os.path.join(dir, filename))
              city[0].append(os.path.join(dir, filename))
          if filename.endswith(".mp4"):
              city[1].append(os.path.join(dir, filename))
          else:
              continue
  elif dir == "misc":
      for filename in os.listdir(directory + dir):
          if filename.endswith(".jpg") or filename.endswith(".ARW"):
              # print(os.path.join(dir, filename))
              misc[0].append(os.path.join(dir, filename))
          if filename.endswith(".mp4"):
              misc[1].append(os.path.join(dir, filename))
          else:
              continue
  elif dir == "nature":
      for filename in os.listdir(directory + dir):
          if filename.endswith(".jpg") or filename.endswith(".ARW"):
              # print(os.path.join(dir, filename))
              nature[0].append(os.path.join(dir, filename))
          if filename.endswith(".mp4"):
              nature[1].append(os.path.join(dir, filename))
          else:
              continue
  elif dir == "sky_landscape":
      for filename in os.listdir(directory + dir):
          if filename.endswith(".jpg") or filename.endswith(".ARW"):
              # print(os.path.join(dir, filename))
              sky_landscape[0].append(os.path.join(dir, filename))
          if filename.endswith(".mp4"):
              sky_landscape[1].append(os.path.join(dir, filename))
          else:
              continue
  elif dir == "wildlife":
      for filename in os.listdir(directory + dir):
          if filename.endswith(".jpg") or filename.endswith(".ARW"):
              # print(os.path.join(dir, filename))
              wildlife[0].append(os.path.join(dir, filename))
          if filename.endswith(".mp4"):
              wildlife[1].append(os.path.join(dir, filename))
          else:
              continue
  else:
      continue

def ResponsiveGallery(doVideo = False, doRandom = False):
    global mediaListSep 
    mediaListSep = [astro[0][1:] + city[0][1:] + misc[0][1:] + nature[0][1:] + sky_landscape[0][1:] + wildlife[0][1:], astro[1][1:] + city[1][1:] + misc[1][1:] + nature[1][1:] + sky_landscape[1][1:] + wildlife[1][1:]]

    if doVideo:
        mediaList = mediaListSep[0] + mediaListSep[1]
    else:
        mediaList = mediaListSep[0]

    if doRandom: 
        random.shuffle(mediaList)


    f = open("gallery_items.html", "w")
    pos = 0

    while True:
        try:
            f.write("""
            photos.add(Image.asset('images/photography/""" + mediaList[pos] + """', height: 35));""")            
            pos += 1
        except IndexError:
            break

    f.close()

ResponsiveGallery(False, False)