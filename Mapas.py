from time import sleep
from datetime import date
import PySimpleGUI as pys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

lista = {}
nome_mapa, site = '', ''
num = date.today().weekday()
links, difficulty, final = [], [], []
line, column, loop, c, f = 1, 1, 1, 1, 0

if num < 5:
    site = "https://osu.ppy.sh/beatmapsets?m=0&s=pending"
else:
    site = "https://osu.ppy.sh/beatmapsets?m=0"

driver = webdriver.Chrome(executable_path=r"C:\Users\Gabri\anaconda3\chromedriver.exe")
wait: WebDriverWait = WebDriverWait(driver, 15)
driver.get(site)

driver.find_element_by_xpath('/html/body/div[4]/div[1]/div[4]/div/div[2]/div[4]/button').click()
driver.find_element_by_xpath('/html/body/div[5]/div/form/div[1]/input[1]').send_keys('Nerean')
driver.find_element_by_xpath('/html/body/div[5]/div/form/div[1]/input[2]').send_keys('tocinho1')
driver.find_element_by_xpath('/html/body/div[5]/div/form/div[5]/div/button/div/span[1]').click()


class funcoes:
    @staticmethod
    def not1():
        layout2 = [
            [pys.Text(f'Quantos mapas deseja?', size=(25, 0))],
            [pys.Input(size=(20, 0), key='num'), pys.Button('Enviar', key='Enviar')]
        ]
        jan2 = pys.Window('Procura', layout=layout2, finalize=True)

        while True:
            events, value = jan2.read()
            jan2.hide()
            jan2.un_hide()
            if events == pys.WIN_CLOSED:
                driver.quit()
                break
            try:
                n = int(value['num'])
                break
            except:
                jan2.close()
                layout2 = [
                    [pys.Text(f'Por favor, insira um número!', size=(25, 0))],
                    [pys.Input(size=(20, 0), key='num'), pys.Button('Enviar', key='Enviar')]
                ]
                jan2 = pys.Window('Procura', layout=layout2, finalize=True)
        jan2.close()
        return int(value['num'])

    @staticmethod
    def not2():
        layout2 = [
            [pys.Text(f'Todos os {len(final)} mapas foram encontados!')],
            [pys.Text(f'O último mapa foi {nome_mapa}')],
            [pys.Text('Deseja baixá-los?', size=(20, 0))],
            [pys.Button('Sim', key='Sim'), pys.Button('Não', key='Nao')]
        ]

        jan2 = pys.Window('Pergunta', layout=layout2, finalize=True)
        events, value = jan2.read()
        jan2.hide()
        jan2.un_hide()
        l = [events, jan2]
        return l

    @staticmethod
    def inicio():
        global line, column, c, loop
        nome_mapa = ''
        games = driver.find_element_by_css_selector(
            f""".beatmapsets__items-row:nth-of-type({line}) .beatmapsets__item:nth-of-type({column}) 
                    .beatmapset-panel__info-row--extra""")
        nome_mapa = driver.find_elements_by_css_selector(
            f"""body > div.osu-layout__section.osu-layout__section--full.js-content.beatmaps_index > div > 
            div.osu-layout__row.osu-layout__row--page-compact > div > div.beatmapsets__content.js-audio--group > div 
            > div > div:nth-child({line}) > div:nth-child({column}) > div > div > div.beatmapset-panel__info > 
            div.beatmapset-panel__info-row.beatmapset-panel__info-row--title > a""")
        for nome in nome_mapa:
            nome_mapa = nome.text
        actions = ActionChains(driver)
        if c % 2 == 0:
            driver.execute_script("window.scrollBy(0,70)")
        if loop >= 22:
            driver.execute_script("window.scrollBy(0,140)")
        actions.move_to_element(games).perform()
        wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".beatmaps-popup__group")))
        scores = driver.find_elements_by_css_selector(
            ".beatmaps-popup__group .beatmaps-popup-item__col.beatmaps-popup-item__col--difficulty")
        l = [games, scores, nome_mapa]
        return l

    @staticmethod
    def pegar_link():
        wait.until(EC.element_to_be_clickable(
            (By.CSS_SELECTOR, f"""body > div.osu-layout__section.osu-layout__section--full.js-content.beatmaps_show > 
                div > div > div.osu-layout__row.osu-layout__row--page-compact > div.beatmapset-header > div > 
                div.beatmapset-header__box.beatmapset-header__box--main > div.beatmapset-header__buttons > 
                a.btn-osu-big.btn-osu-big--beatmapset-header.js-beatmapset-download-link > span""")))
        link_test = ''
        nome_mapa = ''
        nome_mapa = driver.find_elements_by_css_selector(
            """body > div.osu-layout__section.osu-layout__section--full.js-content.beatmaps_show > div > div > 
            div.osu-layout__row.osu-layout__row--page-compact > div.beatmapset-header > div > 
            div.beatmapset-header__box.beatmapset-header__box--main > 
            span.beatmapset-header__details-text.beatmapset-header__details-text--title > a""")
        for nome in nome_mapa:
            nome_mapa = nome.text
        link_test = driver.current_url
        links.append(link_test)
        driver.back()
        wait.until(EC.element_to_be_clickable(
            (By.CSS_SELECTOR, f"""body > div.osu-layout__section.osu-layout__section--full.js-content.beatmaps_index > 
                            div > div:nth-child(2) > div > div > div.beatmapsets-search__input-container > input""")))
        return nome_mapa


wait.until(EC.element_to_be_clickable(
    (By.CSS_SELECTOR, f"""body > div.osu-layout__section.osu-layout__section--full.js-content.beatmaps_index > 
                            div > div:nth-child(2) > div > div > div.beatmapsets-search__input-container > input""")))

n = funcoes.not1()
driver.execute_script("window.scrollBy(0,250)")
while True:
    if len(final) == n:
        break
    if loop == 22:
        # a = input('qlqr coisa: ')
        line = 11
        column = 2

    scores = funcoes.inicio()
    # print(f'\nLinha {line}')
    # print(f'Coluna {column}\n')

    if c % 2 != 0:
        column = 2
        if c % 2 == 0:
            line += 1
    else:
        line += 1
        column = 1

    for score in scores[1]:
        a = score.text
        b = a.replace(',', '.')
        try:
            difficulty.append(float(b))
        except:
            pass

    for numbers in difficulty:
        if 5.40 <= numbers <= 6.50:
            f = 1
    if f != 0:
        scores[0].click()
        nome_mapa = funcoes.pegar_link()
    else:
        nome_mapa = scores[2]

    lista = {
        'map': f"{nome_mapa}",
        'link': f"{links}",
        'difficulty': f"{difficulty}"}

    # print(f"Loop: {loop}\nMapa: {lista['map']}\nLink: {links}\nDificuldade: {lista['difficulty']}\n")

    for url in links:
        if url not in final:
            final.append(str(url))

    difficulty.clear()
    lista.clear()
    links.clear()
    nome_mapa = ''
    loop += 1
    c += 1
    f = 0

notificacao2 = funcoes.not2()

if notificacao2[0] == 'Sim':
    driver.quit()
    notificacao2[1].close()
    sleep(2)
    goog = py.locateCenterOnScreen(r'E:\Backup\backup PC\Imagens\google.png')
    goog2 = py.locateCenterOnScreen(r'E:\Backup\backup PC\Imagens\google2.png')
    if goog is None:
        if goog2 is None:
            os.startfile(r'C:\Program Files\Google\Chrome\Application\chrome.exe')
        else:
            py.hotkey('ctrlleft', 't')
    else:
        py.click(goog)
        py.hotkey('ctrlleft', 't')
    sleep(1)
    for a in final:
        py.write(a)
        sleep(1)
        py.press('enter')
        sleep(1)
        py.hotkey('ctrlleft', 't')

sleep(1)
py.hotkey('ctrlleft', 'w')
if notificacao2[0] == 'Nao':
    driver.quit()
    notificacao2[1].close()
