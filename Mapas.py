from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from time import sleep
import os
import pyautogui as py

driver = webdriver.Chrome(executable_path=r"C:\Users\Gabri\anaconda3\chromedriver.exe")
driver.get("https://osu.ppy.sh/beatmapsets?m=0")
wait = WebDriverWait(driver, 20)

lista = {}
links, difficulty, maps2, final = [], [], [], []
line, column, = 1, 1
link_test = ''

for maps_quantity in range(1, 5):

    sleep(1)
    wait.until(EC.element_to_be_clickable(
        (By.CSS_SELECTOR, f".beatmapsets__items-row:nth-of-type(1)>.beatmapsets__item:nth-of-type(1)")))
    games = driver.find_element_by_css_selector(
        f".beatmapsets__items-row:nth-of-type({line}) .beatmapsets__item:nth-of-type({column}) .beatmapset-panel__info-row--extra")
    actions = ActionChains(driver)
    actions.move_to_element(games).perform()
    wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".beatmaps-popup__group")))
    scores = driver.find_elements_by_css_selector(
        ".beatmaps-popup__group .beatmaps-popup-item__col.beatmaps-popup-item__col--difficulty")

    if maps_quantity == 1:
        column = 2
    if maps_quantity == 2:
        column = 1
        line = 2
    if maps_quantity == 3:
        column = 2

    for score in scores:
        a = score.text
        b = a.replace(',', '.')
        difficulty.append(float(b))

    games.click()
    sleep(3)
    link_test = driver.current_url
    links.append(link_test)
    link_test = ''
    driver.back()

    lista = {
        'map': f"{maps_quantity}",
        'link': f"{links}",
        'difficulty': f"{difficulty}"}

    print(f"Map: {lista['map']}\nLink: {links}\nDifficulty: {lista['difficulty']}\n")

    for b in difficulty:
        if b >= 6.00:
            xam = str(links[0])
            xam1 = xam.replace("'", '')
            xam2 = xam1.replace("[", '')
            xam3 = xam2.replace("]", '')
            final.append(xam3)

    difficulty.clear()
    lista.clear()
    links.clear()

print(f'There are {len(sorted(set(final)))} maps to download')


pergunta='y'
sleep(5)
if pergunta == 'y':
    driver.close()
    for x in final:
        maps2.append(x)
sleep(5)
for o, item in enumerate(sorted(set(maps2))):
    if o == 1:
        os.startfile(r"C:\Program Files\Google\Chrome\Application\chrome.exe")
        sleep(2)
    else:
        sleep(1)
        py.write(item)
        py.press('enter')
        py.hotkey('ctrlleft','t')
    if o == len(sorted(set(maps2))):
        py.hotkey('ctrlleft','w')
