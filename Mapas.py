import winsound
import webbrowser
from time import sleep
from datetime import date
import PySimpleGUI as pys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

lista = {}
nome_mapa, site, games = '', '', ''
num = date.today().weekday()
links, difficulty, final, nomes = [], [], [], []
line, column, loop, c, f = 1, 1, 1, 1, 0

if num < 5:
    site = "https://osu.ppy.sh/beatmapsets?m=0&s=pending"
else:
    site = "https://osu.ppy.sh/beatmapsets?m=0"
driver = webdriver.Chrome(executable_path=r"C:\Users\Gabri\anaconda3\chromedriver.exe")
wait: WebDriverWait = WebDriverWait(driver, 15)
driver.get(site)


def not1():
    layout2 = [
        [pys.Text(f'Quantos mapas deseja?', size=(25, 0))],
        [pys.Input(size=(20, 0), key='num'), pys.Button('Enviar', key='Enviar')]
    ]
    jan2 = pys.Window('Procura', layout=layout2, finalize=True)

    while True:
        events, value = jan2.read()
        if events == pys.WIN_CLOSED:
            driver.quit()
            break
        try:
            n = int(value['num'])
            break
        except:
            jan2.close()
            layout2 = [
                [pys.Text(f'Por favor, insira apenas números!', size=(25, 0))],
                [pys.Input(size=(20, 0), key='num'), pys.Button('Enviar', key='Enviar')]
            ]
            jan2 = pys.Window('Procura', layout=layout2, finalize=True)
    jan2.close()
    return int(value['num'])


def not2():
    layout2 = [
        [pys.Text(f'Todos os {len(final)} mapas foram encontados!')],
        [pys.Text('Deseja baixá-los?', size=(20, 0))],
        [pys.Button('Sim', key='Sim'), pys.Button('Não', key='Nao')]
    ]

    jan2 = pys.Window('Pergunta', layout=layout2, finalize=True)
    events, value = jan2.read()
    l = [events, jan2]
    return l


def not3():
    layout_mais = [
        [pys.Text(f'Deseja mais mapas?', size=(30, 0))],
        [pys.Button('Sim', key='Sim'), pys.Button('Não', key='Nao')]
    ]
    return layout_mais


def inicio():
    global line, column, c, loop, nome_mapa
    games = driver.find_element_by_css_selector(
        f""".beatmapsets__items-row:nth-of-type({line}) .beatmapsets__item:nth-of-type({column})
                   .beatmapset-panel__info-row--extra""")

    nome_mapa = achar_css(
        f""".beatmapsets__content.js-audio--group > 
        div > div > div:nth-child({line}) > div:nth-child({column}) > div > div > div.beatmapset-panel__info > 
        div.beatmapset-panel__info-row.beatmapset-panel__info-row--title > a""")

    for nome in nome_mapa:
        nome_mapa = nome.text

    if c > 22:
        driver.execute_script("window.scrollBy(0,40)")
    else:
        driver.execute_script("window.scrollBy(0,50)")

    actions = ActionChains(driver)
    actions.move_to_element(games).perform()
    # sleep(1)

    esperar_css(".beatmaps-popup__group")
    scores = achar_css(".difficulty-badge")

    l = [games, scores, nome_mapa]
    return l


def pegar_link():
    global c
    pega = False
    nome_mapa = ''
    esperar_css(f""".js-beatmapset-download-link > span""")

    nome_mapa = achar_css(""".beatmapset-header__details-text--title > a""")
    for nome in nome_mapa:
        nome_mapa = nome.text
        nomes.append(nome_mapa)

    mapas = achar_css(""".beatmapset-beatmap-picker__beatmap""")
    for clicar in mapas:
        if pega:
            break
        dif = achar_css('.beatmapset-header__star-difficulty')
        actions = ActionChains(driver)
        actions.move_to_element(clicar).perform()

        for a in dif:
            if pega:
                break
            xax = a.text
            xax2 = xax.replace('Dificuldade ', '')
            xax3 = xax2.replace(',', '.')
            xax3 = float(xax3)
            if 5.90 <= xax3 <= 6.50:
                clicar.click()
                duracao = achar_css(""".beatmapset-stats__row--basic > div > div:nth-child(1) > span""")
                for a in duracao:
                    dur_str = a.text
                    dur_str = dur_str.replace(':', '.')
                    dur_float = float(dur_str)
                    # sleep(1)
                    if 1.50 <= dur_float <= 6.00:
                        pega = True
                        break
                    else:
                        pass

    if pega:
        link_test = ''
        link_test = driver.current_url
        links.append(link_test)
        driver.back()
        esperar_css(f"""body > div.osu-layout__section.osu-layout__section--full.js-content.beatmaps_index > 
                                div > div:nth-child(2) > div > div > div.beatmapsets-search__input-container > input""")
    else:
        driver.back()
        esperar_css(f"""body > div.osu-layout__section.osu-layout__section--full.js-content.beatmaps_index > 
                                        div > div:nth-child(2) > div > div > 
                                        div.beatmapsets-search__input-container > input""")
    if c > 22:
        sleep(3)
    return nome_mapa


def achar_css(elemento):
    ponto = driver.find_elements_by_css_selector(str(elemento))
    return ponto


def achar_xpath(elemento):
    ponto = driver.find_element_by_xpath(elemento)
    return ponto


def esperar_css(elemento):
    ponto = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, elemento)))
    return ponto


def login():
    achar_xpath('/html/body/div[4]/div[1]/div[4]/div/div[2]/div[4]/button').click()
    achar_xpath('/html/body/div[5]/div/form/div[1]/input[1]').send_keys('Nerean')
    achar_xpath('/html/body/div[5]/div/form/div[1]/input[2]').send_keys('tocinho1')
    achar_xpath('/html/body/div[5]/div/form/div[5]/div/button/div/span[1]').click()


login()
esperar_css(
    """body > div.osu-layout__section.osu-layout__section--full.js-content.beatmaps_index > div > 
    div:nth-child(2) > div > div > div.beatmapsets-search__input-container > input""")

number_of_maps = not1()
jan_mais = pys.Window('Pergunta', layout=not3(), finalize=True)
jan_mais.hide()

while True:
    if len(final) == number_of_maps:
        winsound.PlaySound(r'E:\Backup\Musicas\fim.wav', winsound.SND_ASYNC)
        notificacao2 = not2()

        if notificacao2[0] == 'Sim':
            notificacao2[1].close()
            webbrowser.register('chrome', None,
                                webbrowser.BackgroundBrowser(r"C:\Program Files\Google\Chrome\Application\chrome.exe"))
            for a in final:
                webbrowser.open(a)
                sleep(1)

        if notificacao2[0] == 'Nao':
            notificacao2[1].close()
            break

        jan_mais.un_hide()
        events, value = jan_mais.read()
        if events == 'Sim':
            jan_mais.hide()
            final.clear()
            number_of_maps = not1()
        if events == 'Nao':
            jan_mais.close()
            break
        if events == pys.WIN_CLOSED:
            break

    if loop == 21:
        line = line - 1
    if loop % 2 == 0 and loop > 21:
        line -= 1
    scores = inicio()

    # print('-' * 70)
    # print(f'Mapas encontrados: {len(final)}')
    # print(f'Line {line}')
    # print(f'Column {column}\n')

    if c % 2 != 0:
        column = 2
        if c % 2 == 0:
            line += 1
    else:
        line += 1
        column = 1

    for score in scores[1]:
        score_string = score.text
        score_float = score_string.replace(',', '.')
        try:
            difficulty.append(float(score_float))
        except:
            pass

    nome_mapa = scores[2]

    for numbers in difficulty:
        if 5.90 <= numbers <= 6.50:
            f = 1
    if f != 0 and nome_mapa not in nomes:
        scores[0].click()
        nome_mapa = pegar_link()
        if nome_mapa not in nomes:
            nomes.append(nome_mapa)

    lista = {
        'map': f"{nome_mapa}",
        'link': f"{links}",
        'difficulty': f"{difficulty}"}

    # print(f"Loop: {loop}\nMapa: {lista['map']}\nLink: {links}\nDificuldade: {lista['difficulty']}\n{'-' * 70}")
    # print(f'\n{nomes}\n{len(nomes)}')

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

driver.quit()
