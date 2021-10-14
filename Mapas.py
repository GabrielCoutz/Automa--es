# -*- encoding: utf-8 -*-
import winsound
import threading
import webbrowser
import pygetwindow as window
from time import sleep
from datetime import date
import PySimpleGUI as pys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys


class Contador:
    def __init__(self, contador, linha, coluna):
        self.contador = contador
        self.linha = linha
        self.coluna = coluna

    def start(self):
        if self.contador == 21:
            self.linha = self.linha - 1
        if self.contador % 2 == 0 and self.contador > 21:
            self.linha -= 1

        if self.contador % 2 != 0:
            self.coluna = 2
            if self.contador % 2 == 0:
                self.linha += 1
        else:
            self.linha += 1
            self.coluna = 1

        self.contador += 1
        return [self.contador, self.linha, self.coluna]


class Seletor:
    final = []
    nomes = []
    pesquisa = False

    def __init__(self, contador, linha, coluna):
        self.contador = contador
        self.linha = linha
        self.coluna = coluna
        self.actions = ActionChains(driver)

    def pegar_link(self):

        pega, sair = False, False

        esperar_css(f""".js-beatmapset-download-link > span""")

        mapas = achar_css(""".beatmapset-beatmap-picker__beatmap""")
        for clicar in mapas:
            if pega or sair:
                break
            actions = ActionChains(driver)
            actions.move_to_element(clicar).perform()

            dif2 = achar_css('.beatmapset-header__star-difficulty')[0].text
            dif2 = dif2.replace('Dificuldade ', '')
            dif2 = dif2.replace(',', '.')
            xax3 = float(dif2)

            if 5.90 <= xax3 <= 6.50:
                clicar.click()
                dur_str = achar_css(""".beatmapset-stats__row--basic > div > div:nth-child(1) > span""")[0].text
                dur_str = dur_str.replace(':', '.')
                if len(dur_str) > 4:
                    break

                dur_float = float(dur_str)
                if not self.pesquisa:
                    if 1.50 <= dur_float <= 6.00:
                        pega = True
                        break
                    else:
                        pass
                else:
                    if 1.00 <= dur_float <= 8.00:
                        pega = True
                        break
                    else:
                        pass

            if xax3 > 6.50:
                sair = True
                break

        if pega:
            link = driver.current_url
            driver.back()
            esperar_css(f"""body > div.osu-layout__section.osu-layout__section--full.js-content.beatmaps_index > 
                                            div > div:nth-child(2) > div > div > div.beatmapsets-search__input-container > input""")

            if link not in self.final and link != '':
                self.final.append(str(link))

        else:
            driver.back()
            esperar_css(f"""body > div.osu-layout__section.osu-layout__section--full.js-content.beatmaps_index > 
                                                    div > div:nth-child(2) > div > div > 
                                                    div.beatmapsets-search__input-container > input""")

    def seletor(self, **kwargs):

        if kwargs['nome_do_mapa']:
            self.pesquisa = True

        if len(self.final) == kwargs['limite']:
            notificacoes.final(self.final)
            return 1
        games = driver.find_element_by_css_selector(
            f""".beatmapsets__items-row:nth-of-type({self.linha}) .beatmapsets__item:nth-of-type({self.coluna})
                           .beatmapset-panel__info-row--extra""")
        self.nome_mapa = achar_css(
            f""".beatmapsets__content.js-audio--group > 
                div > div > div:nth-child({self.linha}) > div:nth-child({self.coluna}) > div > div > div.beatmapset-panel__info > 
                div.beatmapset-panel__info-row.beatmapset-panel__info-row--title > a""")[0].text

        if self.contador > 22:
            driver.execute_script("window.scrollBy(0,40)")
        else:
            driver.execute_script("window.scrollBy(0,50)")

        self.actions.move_to_element(games).perform()

        esperar_css(".beatmaps-popup__content")
        scores = achar_css(".difficulty-badge")

        if self.nome_mapa in self.nomes:
            pass
        else:
            for score in scores:
                score = score.text
                score_float = score.replace(',', '.')
                if float(score_float) > 6.50:
                    break
                if 5.90 <= float(score_float) <= 6.50:
                    if self.nome_mapa not in self.nomes and not self.pesquisa:
                        games.click()
                        self.pegar_link()
                        if self.nome_mapa not in self.nomes:
                            self.nomes.append(self.nome_mapa)
                            break
                        break
                    if self.pesquisa:
                        games.click()
                        self.pegar_link()
                        break
        if self.nome_mapa not in self.nomes and not self.pesquisa:
            self.nomes.append(self.nome_mapa)


class notificacoes:

    @staticmethod
    def inicial():
        layout2 = [
            [pys.Text(f'Quantos mapas deseja?', size=(25, 0))],
            [pys.Input(size=(10, 0), key='num'), pys.Button('Enviar', key='Enviar'),
             pys.Button('Pesquisar', key='Pesquisar')],

        ]
        jan2 = pys.Window('Procura', layout=layout2, finalize=True)

        while True:
            events, value = jan2.read()
            if events == pys.WIN_CLOSED:
                exit()
            elif events == 'Pesquisar':
                jan2.close()
                layout_pesquisa = [
                    [pys.Text(f'Insira o nome do mapa', size=(25, 0))],
                    [pys.Input(size=(30, 0), key='pesquisa_nome')],
                    [pys.Text(f'Insira Quantos mapas deseja', size=(25, 0))],
                    [pys.Input(size=(30, 0), key='pesquisa_numero'), pys.Button('Enviar', key='Enviar')]
                ]
                jan_pesq = pys.Window('Procura', layout=layout_pesquisa, finalize=True)
                events, value = jan_pesq.read()
                if events == pys.WIN_CLOSED:
                    exit()
                elif events == 'Enviar':
                    jan_pesq.close()
                    return [int(value['pesquisa_numero']), value['pesquisa_nome']]
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
                events, value = jan2.read()
                if events == pys.WIN_CLOSED:
                    exit()
        jan2.close()
        return [int(value['num']), None]

    @staticmethod
    def final(limite):
        winsound.PlaySound(r'E:\Backup\Musicas\fim.wav', winsound.SND_ASYNC)
        layout2 = [
            [pys.Text(f'Todos os {len(limite)} mapas foram encontados!')],
            [pys.Text('Deseja baixá-los?', size=(20, 0))],
            [pys.Button('Sim', key='Sim'), pys.Button('Não', key='Nao')]
        ]

        jan2 = pys.Window('Pergunta', layout=layout2, finalize=True)
        events, value = jan2.read()
        if events == 'Sim':
            jan2.close()
            abrir_mapas(limite)
        elif events == 'Nao':
            exit()
        elif events == pys.WIN_CLOSED:
            exit()


########################################


def login():
    threading.Thread(target=esconder).start()

    if date.today().weekday() < 5:
        site = "https://osu.ppy.sh/beatmapsets?m=0&s=pending"
    else:
        site = "https://osu.ppy.sh/beatmapsets?m=0"

    if saida_da_not[1] is not None:  # pesquisa
        driver.get('https://osu.ppy.sh/beatmapsets?m=0&s=any')
    else:
        driver.get(site)
    achar_xpath('/html/body/div[4]/div[1]/div[4]/div/div[2]/div[4]/button').click()
    achar_xpath('/html/body/div[5]/div/form/div[1]/input[1]').send_keys('Nerean')
    achar_xpath('/html/body/div[5]/div/form/div[1]/input[2]').send_keys('tocinho1')
    achar_xpath('/html/body/div[5]/div/form/div[5]/div/button/div/span[1]').click()
    esperar_css(
        """body > div.osu-layout__section.osu-layout__section--full.js-content.beatmaps_index > div > 
        div:nth-child(2) > div > div > div.beatmapsets-search__input-container > input""")
    if saida_da_not[1]:
        driver.find_element_by_css_selector(
            """body > div.osu-layout__section.osu-layout__section--full.js-content.beatmaps_index > div > 
            div:nth-child(2) > div > div > div.beatmapsets-search__input-container > 
            input""").send_keys(saida_da_not[1], Keys.ENTER)
        sleep(3)


def abrir_mapas(limite):
    driver.quit()
    for a in limite:
        webbrowser.open(a)
        sleep(1)


def achar_css(elemento):
    ponto = driver.find_elements_by_css_selector(str(elemento))
    return ponto


def achar_xpath(elemento):
    ponto = driver.find_element_by_xpath(elemento)
    return ponto


def esperar_css(elemento):
    ponto = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, elemento)))
    return ponto


def esconder():
    while not window.getWindowsWithTitle('osu') or not window.getWindowsWithTitle('chromedriver'):
        sleep(0.1)
    window.getWindowsWithTitle('chromedriver')[0].hide()
    window.getWindowsWithTitle('osu')[0].hide()


########################################

Inicio = Contador(0, 0, 0)

saida_da_not = notificacoes.inicial()

driver = webdriver.Chrome(executable_path=r"C:\Users\Gabri\anaconda3\chromedriver.exe")
wait: WebDriverWait = WebDriverWait(driver, 20)

login()

while True:
    resultados = Inicio.start()
    if Seletor(resultados[0], resultados[1], resultados[2]).seletor(limite=saida_da_not[0],
                                                                    nome_do_mapa=saida_da_not[1]):
        break
