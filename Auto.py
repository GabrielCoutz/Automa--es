# -*-coding: utf-8-*-
import pyautogui as py
from time import sleep
import webbrowser
import winsound
import importlib.util
from random import randint
from datetime import date
import locale
import os
import psutil
import pygetwindow as window

locale.setlocale(locale.LC_ALL, 'pt_BR.utf8')
osu = ''
dia = date.today().weekday()
f = 0
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


def verificar(a):
    if py.locateCenterOnScreen(a):
        return True
    return False


def inicio():
    py.alert("Escolhi uma música de sua playlist, espero que goste =)\n"
             "Te aviso quando acabar ;)")
    r = randint(1, 5)
    winsound.PlaySound(f'E:\\Backup\\Musicas\\intro{r}.wav', winsound.SND_ASYNC)


def som():
    global bluestacks

    os.startfile(r"C:\Program Files\BlueStacks\Bluestacks.exe")
    while True:
        if ("Bluestacks.exe" in (i.name() for i in psutil.process_iter())) is True and len(bluestacks) >= 1:
            break
        else:
            bluestacks = window.getWindowsWithTitle('Blue')
    sleep(1)
    fechar("Bluestacks.exe")
    sleep(1)
    fechar("HD-Agent.exe")
    sleep(1)

    py.leftClick(Imagens.Imagens.mais)

    sleep(2.5)
    try:
        razer2 = py.locateCenterOnScreen(r'E:\Backup\backup PC\Imagens\razer2.png')
        py.doubleClick(razer2)
    except:
        razeratt = py.locateCenterOnScreen(r'E:\Backup\backup PC\Imagens\attrazer.png')
        py.doubleClick(razeratt)
    sleep(2)
    mouse = py.locateCenterOnScreen(r'E:\Backup\backup PC\Imagens\mouse.png')
    if mouse is not None:
        py.moveTo(mouse)
        mou = py.position()
        py.click(mou[0] + 90, mou[1])
        sleep(1)
        py.click(mou[0] - 180, mou[1] + 10)
        f = 0
    else:
        f = 1
        py.doubleClick(Imagens.Imagens.mais)

    try:
        py.doubleClick(Imagens.Imagens.razera)
        sleep(0.5)
    except:
        py.leftClick(Imagens.Imagens.mais)
        sleep(1)
        py.doubleClick(Imagens.Imagens.razera)
    sleep(1)

    if verificar(Imagens.Imagens.loc) is False:
        py.leftClick(Imagens.Imagens.mais)
        sleep(1)
        py.doubleClick(Imagens.Imagens.razera)
        sleep(1)

    try:
        py.leftClick(Imagens.Imagens.conf2)
    except:
        py.leftClick(Imagens.Imagens.conf)

    pos1 = py.position()
    xp2 = pos1[0]
    yp2 = pos1[1]
    py.leftClick(xp2 - 34, yp2 + 82)
    py.leftClick(xp2 - 34, yp2 + 82)
    py.leftClick(xp2 - 34, yp2 + 82)

    sleep(1.3)

    pos = py.position()
    xp = pos[0]
    yp = pos[1]
    py.leftClick(xp - 70, yp)
    py.leftClick(xp - 70, yp)
    py.leftClick(xp - 70, yp)
    sleep(1)

    janrazer = window.getWindowsWithTitle("Razer")
    window.Window.close(janrazer[0])

    if f != 0:
        try:
            py.leftClick(Imagens.Imagens.mais)
            sleep(2.5)
            try:
                razer2 = py.locateCenterOnScreen(r'E:\Backup\backup PC\Imagens\razer2.png')
                py.doubleClick(razer2)
            except:
                razeratt = py.locateCenterOnScreen(r'E:\Backup\backup PC\Imagens\attrazer.png')
                py.doubleClick(razeratt)
            sleep(2)
            mouse = py.locateCenterOnScreen(r'E:\Backup\backup PC\Imagens\mouse.png')
            py.moveTo(mouse)
            mou = py.position()
            py.click(mou[0] + 90, mou[1])
            sleep(1)
            py.click(mou[0] - 180, mou[1] + 10)
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
    py.alert(f"Processo finalizado!\nTenha uma boa {sem[num]}-Feira =D\n{texto}")
else:
    inicio()
    som()
    googlefds()
    py.alert(f"Processo finalizado!\nTenha um bom {sem[num]} =D")
