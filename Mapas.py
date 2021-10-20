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
    final, nomes, links_lidos = [], [], []
    pesquisa = False

    def __init__(self, contador, linha, coluna):
        self.contador = contador
        self.linha, self.coluna = linha, coluna
        self.actions = ActionChains(driver)
        self.Dmin, self.Dmax = 6.00, 6.50
        self.Durmin, self.Durmax = 1.50, 6.00

    def pegar_link(self):

        pega, sair = False, False
        esperar_css(f""".js-beatmapset-download-link > span""")

        mapas = driver.find_elements_by_css_selector(""".beatmapset-beatmap-picker__beatmap""")
        for clicar in mapas:
            if pega or sair:
                break
            actions = ActionChains(driver)
            actions.move_to_element(clicar).perform()

            xax3 = float(driver.find_element_by_xpath(
                f"(//div[contains(@class,'beatmap-icon')])[{mapas.index(clicar) + 1}]").get_attribute('data-stars'))

            if self.Dmin <= xax3 <= self.Dmax:
                clicar.click()

                duracao = float(driver.find_element_by_css_selector(
                    """.beatmapset-stats__row--basic > div > div:nth-child(1) > span""").text.replace(':', '.'))

                if duracao > 10.00:
                    break

                if not self.pesquisa:
                    if self.Durmin <= duracao <= self.Durmax:
                        pega = True
                        break
                    else:
                        pass
                else:
                    if 2.00 <= duracao <= 8.00:
                        pega = True
                        break
                    else:
                        pass

            if xax3 > self.Dmax:
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
        print(len(self.final))
        if kwargs['nome_do_mapa']:
            self.pesquisa = True
            self.teste = driver.find_element_by_css_selector(f"""body > 
                    div.osu-layout__section.osu-layout__section--full.js-content.beatmaps_index > div > 
                    div.osu-layout__row.osu-layout__row--page-compact > div > div.beatmapsets__content.js-audio--group > 
                    div > div > div:nth-child({self.linha}) > div:nth-child({self.coluna}) > div > a""").get_property(
                'href')

        if kwargs['Dmin'] and kwargs['Dmax']:
            self.Dmin = kwargs['Dmin']
            self.Dmax = kwargs['Dmax']

        if kwargs['Durmin'] and kwargs['Durmax']:
            self.Durmin = kwargs['Durmin']
            self.Durmax = kwargs['Durmax']

        print(self.Dmin, self.Dmax, self.Durmin, self.Durmax)

        if len(self.final) == kwargs['limite']:
            notificacoes.final(self.final)
            return 1

        games = driver.find_element_by_css_selector(
            f""".beatmapsets__items-row:nth-of-type({self.linha}) .beatmapsets__item:nth-of-type({self.coluna})
                           .beatmapset-panel__info-row--extra""")
        self.nome_mapa = achar_css(
            f""".beatmapsets__content.js-audio--group > 
                div > div > div:nth-child({self.linha}) > div:nth-child({self.coluna}) > div > div > div.beatmapset-panel__info > 
                div.beatmapset-panel__info-row.beatmapset-panel__info-row--title > a""").text

        if self.contador > 22:
            driver.execute_script("window.scrollBy(0,40)")
        else:
            driver.execute_script("window.scrollBy(0,50)")

        self.actions.move_to_element(games).perform()

        esperar_css(".beatmaps-popup__content")
        scores = driver.find_elements_by_css_selector(".difficulty-badge")

        if self.nome_mapa in self.nomes:
            pass
        else:
            for score in scores:
                score = score.text
                score_float = score.replace(',', '.')
                if float(score_float) > self.Dmax:
                    break
                if self.Dmin <= float(score_float) <= self.Dmax:
                    if self.nome_mapa not in self.nomes and not self.pesquisa:
                        games.click()
                        self.pegar_link()
                        if self.nome_mapa not in self.nomes:
                            self.nomes.append(self.nome_mapa)
                            break
                        break
                    if self.pesquisa and self.teste not in self.links_lidos:
                        games.click()
                        self.pegar_link()
                        self.links_lidos.append(self.teste)
                        break

        if self.nome_mapa not in self.nomes and not self.pesquisa:
            self.nomes.append(self.nome_mapa)


class notificacoes:

    @staticmethod
    def config():
        layout3 = [
            [pys.Text(f'Dificuldade Mínima', justification='left', size=(15, 0)), pys.Input(size=(10, 0), key='Dmin'),
             pys.Text(f'Dificuldade Máxima', justification='left', size=(15, 0)), pys.Input(size=(10, 0), key='Dmax')],
            [pys.Text(f'Duração Mínima', justification='left', size=(15, 0)), pys.Input(size=(10, 0), key='Durmin'),
             pys.Text(f'Duração Máxima', justification='left', size=(15, 0)), pys.Input(size=(10, 0), key='Durmax')],
            [pys.Button('Enviar', key='Fechar', size=(30, 0))]

        ]
        jan3 = pys.Window('Configurações', element_justification='center', layout=layout3, finalize=True)

        while True:
            events, value = jan3.read()
            if events == pys.WIN_CLOSED:
                exit()
            else:
                jan3.close()
                if value['Dmin'] != '' and value['Dmax'] != '' and value['Durmin'] == '' and value['Durmax'] == '':
                    return [float(value['Dmin']), float(value['Dmax']), None, None]

                elif value['Durmin'] != '' and value['Durmax'] != '' and value['Dmin'] == '' and value['Dmax'] == '':
                    return [None, None, float(value['Durmin']), float(value['Durmax'])]

                elif value['Durmin'] != '' and value['Durmax'] != '' and value['Dmin'] != '' and value['Dmax'] != '':
                    return [float(value['Durmin']), float(value['Durmax']), float(value['Dmin']), float(value['Dmax'])]

    @staticmethod
    def inicial():
        layout2 = [
            [pys.Text(f'Quantos mapas deseja?', justification='center', size=(25, 0))],
            [pys.Input(size=(10, 0), key='num')],
            [pys.Button('Enviar', key='Enviar'), pys.Button('Pesquisar', key='Pesquisar'),
             pys.Button('Configurações', key='Config', size=(14, 1))]

        ]
        jan2 = pys.Window('Procura', layout=layout2, element_justification='center', finalize=True)

        while True:
            conf = [None, None, None, None]
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
            elif events == 'Config':
                print('config')
                jan2.hide()
                retorno = notificacoes.config()
                print(retorno)
                conf[0], conf[1], conf[2], conf[3] = retorno[0], retorno[1], retorno[2], retorno[3]
                print('voltou')
            elif events == 'Enviar':
                jan2.close()

            # try:
            #     n = int(value['num'])
            #     break
            # except:
            #     jan2.close()
            #     layout2 = [
            #         [pys.Text(f'Por favor, insira apenas números!', size=(25, 0))],
            #         [pys.Input(size=(20, 0), key='num'), pys.Button('Enviar', key='Enviar')]
            #     ]
            #     jan2 = pys.Window('Procura', layout=layout2, finalize=True)
            #     events, value = jan2.read()
            #     if events == pys.WIN_CLOSED:
            #         exit()
            print(int(value['num']), None, conf[0], conf[1], conf[2], conf[3])
            return [int(value['num']), None, conf[0], conf[1], conf[2], conf[3]]

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
        else:
            driver.quit()
            exit()


########################################


def login():
    # threading.Thread(target=esconder).start()

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
    ponto = driver.find_element_by_css_selector(str(elemento))
    return ponto


def achar_xpath(elemento):
    ponto = driver.find_element_by_xpath(elemento)
    return ponto


def esperar_css(elemento):
    ponto = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, elemento)))
    return ponto


def esconder():
    while not window.getWindowsWithTitle('osu') and not window.getWindowsWithTitle('chromedriver'):
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
                                                                    nome_do_mapa=saida_da_not[1],
                                                                    Dmin=saida_da_not[2],
                                                                    Dmax=saida_da_not[3],
                                                                    Durmin=saida_da_not[4],
                                                                    Durmax=saida_da_not[5]):
        break
