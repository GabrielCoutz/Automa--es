# -*- encoding: utf-8 -*-
import pyautogui as py
from time import sleep
import webbrowser
import winsound
import importlib.util
from random import randint
from datetime import date
import locale
import os
import pygetwindow as window

locale.setlocale(locale.LC_ALL, 'pt_BR.utf8')
osu = ''
dia = date.today().weekday()
f, c = 0, 0
bluestacks = window.getWindowsWithTitle('Blue')
barra, play = 1593, 1564
barras = [389, 454, 579, 702, 765]
plays = [387, 456, 577, 705, 766]

if dia < 5:
    osu = "https://osu.ppy.sh/beatmapsets?m=0&s=pending"
else:
    osu = "https://osu.ppy.sh/beatmapsets?m=0"

spec = importlib.util.spec_from_file_location(
    "name", "C:\\Users\\Gabri\\PycharmProjects\\pythonProject\\Imagens.py")
Imagens = importlib.util.module_from_spec(spec)
spec.loader.exec_module(Imagens)


def finalizar(a):
    py.rightClick(a)
    sleep(0.5)
    py.press('down')
    sleep(0.5)
    py.press('enter')
    sleep(0.5)


def fechar(name):
    os.system("taskkill /f /im " + name)


def login(x, y):
    py.click(x, y)
    while verificar(Imagens.Imagens.conta1) is False:
        sleep(0.1)
    py.press('tab', 5)
    sleep(1)
    py.press('enter')
    sleep(1.5)
    while verificar(Imagens.Imagens.log33) is False:
        sleep(0.1)
    log3 = py.locateCenterOnScreen(r'E:\Backup\backup PC\Imagens\log33.png')
    py.click(log3)
    sleep(4)


def verificar(imagem, posicao=None):
    if posicao:
        if py.locateOnScreen(imagem, posicao):
            return True
        return False
    else:
        if py.locateCenterOnScreen(imagem):
            return True
        return False


def esperar(imagem):
    while verificar(imagem) is False:
        pass


def inicio():
    py.alert("Escolhi uma música de sua playlist, espero que goste =)\n"
             "Te aviso quando acabar ;)")
    r = randint(1, 5)
    winsound.PlaySound(f'E:\\Backup\\Musicas\\intro{r}.wav', winsound.SND_ASYNC)


def powersheel(comando):
    import os
    os.system(f'powershell /c {comando}')


def resolver():
    powersheel(r'Start-Process -WindowStyle hidden -FilePath C:\Users\Gabri\Documents\dpclat.exe')


def som():
    global bluestacks, f, c

    resolver()
    while c != 5000:
        if window.getWindowsWithTitle('Error'):
            janela = window.getWindowsWithTitle("Error")
            window.Window.close(janela[0])
            sleep(1)
            resolver()
            break
        else:
            c += 1
    py.leftClick(py.locateOnScreen(Imagens.Imagens.mais))
    if verificar(Imagens.Imagens.razeratt) is False:
        try:
            esperar(Imagens.Imagens.razer2)
            py.doubleClick(py.locateOnScreen(Imagens.Imagens.razer2))
            esperar(Imagens.Imagens.teste)
            if verificar(Imagens.Imagens.mouse) is True:
                aaaaa = py.locateOnScreen(Imagens.Imagens.teste)
                py.moveTo(aaaaa[0] + 200, aaaaa[1] + 150)
                sleep(1)
                py.click(aaaaa[0] - 100, aaaaa[1] + 160)
            else:
                f = 1
        except:
            f = 1
    else:
        pass
    os.startfile(r'C:\Program Files (x86)\Razer\Synapse\RzSynapse.exe')
    while not window.getWindowsWithTitle('Razer'):
        pass
    sleep(1)
    try:
        py.leftClick(Imagens.Imagens.conf2)
    except:
        py.leftClick(Imagens.Imagens.conf)

    pos1 = py.position()
    py.leftClick(pos1[0] - 34, pos1[1] + 82)
    py.leftClick(pos1[0] - 34, pos1[1] + 82)
    py.leftClick(pos1[0] - 34, pos1[1] + 82)

    sleep(1.5)

    pos = py.position()
    py.leftClick(pos[0] - 70, pos[1])
    py.leftClick(pos[0] - 70, pos[1])
    py.leftClick(pos[0] - 70, pos[1])

    janrazer = window.getWindowsWithTitle("Razer")
    window.Window.close(janrazer[0])

    if f != 0:
        try:
            py.leftClick(py.locateOnScreen(Imagens.Imagens.mais))
            esperar(Imagens.Imagens.razer2)
            py.doubleClick(py.locateOnScreen(Imagens.Imagens.razer2))
            esperar(Imagens.Imagens.teste)
            if verificar(Imagens.Imagens.mouse) is True:
                aaaaa = py.locateOnScreen(Imagens.Imagens.teste)
                py.moveTo(aaaaa[0] + 200, aaaaa[1] + 150)
                sleep(1)
                py.click(aaaaa[0] - 100, aaaaa[1] + 160)
            else:
                pass
        except:
            pass


def google():
    sites = ['https://www.youtube.com', 'https://www.imissmybar.com/',
             'https://mail.google.com/mail/u/0/?zx=7quikovz9bly#inbox']
    webbrowser.register('chrome',
                        None,
                        webbrowser.BackgroundBrowser(r"C:\Program Files\Google\Chrome\Application\chrome.exe"))
    for a in sites:
        webbrowser.open(a)
        sleep(1)
    webbrowser.open(osu)
    sleep(0.5)
    if verificar(Imagens.Imagens.max) is False:
        try:
            py.click(Imagens.Imagens.max2)
        except:
            py.click(Imagens.Imagens.max3)
    sleep(1)
    py.leftClick(x=164, y=17)
    py.rightClick(x=164, y=17)
    sleep(0.5)
    py.press('down', 3)
    sleep(0.5)
    py.press('enter')
    sleep(0.5)
    py.write('Lofi')
    sleep(0.5)
    py.press('tab')
    sleep(0.5)
    py.press('right', 6)
    sleep(0.5)
    py.press('enter')
    sleep(1)
    py.leftClick(x=1831, y=50)
    sleep(1.2)
    py.leftClick(x=1624, y=355)
    sleep(1.2)
    py.leftClick(x=1526, y=296)
    sleep(1)
    py.rightClick(x=365, y=12)
    py.press('down', 3)
    sleep(0.5)
    py.press('enter')
    sleep(0.5)
    py.press('down')
    sleep(0.5)
    py.press('enter')
    sleep(0.5)
    py.rightClick(x=365, y=12)
    py.press('down', 9)
    sleep(0.5)
    py.press('enter')
    py.leftClick(x=164, y=17)
    sleep(0.5)
    if verificar(Imagens.Imagens.log3) is False:
        login(1856, 129)
    py.click(x=662, y=128)
    sleep(1.5)
    py.write('lofi')
    sleep(1.5)
    py.press('enter')
    sleep(1.5)
    py.leftClick(x=365, y=12)
    while verificar(Imagens.Imagens.lofi) is False:
        sleep(0.1)
    sleep(0.5)
    for a, b in enumerate(barras):
        py.leftClick(barra, barras[a])
        sleep(0.5)
    for b, c in enumerate(plays):
        py.leftClick(play, plays[b])
        sleep(0.5)

    py.leftClick(x=25, y=14)
    sleep(0.5)
    py.moveTo(x=922, y=564)


def googlefds():
    webbrowser.register('chrome',
                        None,
                        webbrowser.BackgroundBrowser(r"C:\Program Files\Google\Chrome\Application\chrome.exe"))
    sleep(0.5)
    webbrowser.get('chrome').open('https://mail.google.com/mail/u/0/?zx=7quikovz9bly#inbox')
    sleep(1)
    webbrowser.open(osu)
    sleep(0.5)
    py.moveTo(x=922, y=564)


num = date.today().weekday()
num2 = date.today().day
texto = ''

sem = ("Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo")

if num2 == 1:
    texto = 'A propósito, hoje é dia de Limpar os Equipamentos!! XD'

if num < 5:
    inicio()
    som()
    google()
    os.startfile(r'E:\Backup\Pastas de Automações\VivoPasta\vivo.exe')
    py.alert(f"Processo finalizado!\nTenha uma boa {sem[num]}-Feira =D\n{texto}")
else:
    inicio()
    som()
    googlefds()
    os.startfile(r'E:\Backup\Pastas de Automações\VivoPasta\vivo.exe')
    py.alert(f"Processo finalizado!\nTenha um bom {sem[num]} =D")
