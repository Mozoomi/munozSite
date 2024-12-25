import instaloader
import requests

L = instaloader.Instaloader(download_videos=False, download_comments=False, save_metadata=False)
profile = instaloader.Profile.from_username(L.context, "shots.by.munoz")

for index, post in enumerate(profile.get_posts()):
    if index < 12:
        image_url = post.url
        image_data = requests.get(image_url).content
        with open(f"{"images/instaScrapedImgs/"}image_{index + 1}.jpg", "wb") as file:
            file.write(image_data)    
    else:
        break
