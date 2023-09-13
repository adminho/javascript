# py -m pip install requests
import requests
import os

url = 'http://localhost/deploy/javascript_bookcodes.php'


data = {'token': "@E45!a5;6x76top8$3@spG-+"}



directory ='./'
for fname in os.listdir(directory):
    fulll_filefname = os.path.join(directory, fname)
    if os.path.isfile(fulll_filefname) == False:
        continue

    if fname.endswith('.html') and fname != "template.html":         
         with open(fulll_filefname, 'r', encoding='utf-8') as f:             
            data['content'] = f.read()
            data['filename'] = fname    
            res = requests.post(url=url, data = data)
            print("Upload %s -> %s" % (fname, res.text))