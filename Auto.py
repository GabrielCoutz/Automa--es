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
import threading


# Variáveis Globais
locale.setlocale(locale.LC_ALL, 'pt_BR.utf8')
texto, osu = '', ''
f, c = 0, 0


# Setando data
sem = ("Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo")
dia_semana = date.today().weekday()
dia = date.today().day


# Locais para click
barra, play = 1593, 1564
barras = [389, 454, 579, 702, 765]
plays = [387, 456, 577, 705, 766]


# Verificando dia
if dia_semana < 5:
    osu = "https://osu.ppy.sh/beatmapsets?m=0&s=pending"
else:
    osu = "https://osu.ppy.sh/beatmapsets?m=0"
if dia == 1:
    texto = '\n\nA propósito, hoje é dia de Limpar os Equipamentos!! XD'


# Biblioteca de Imagens
spec = importlib.util.spec_from_file_location(
    "name", "C:\\Users\\Gabri\\PycharmProjects\\pythonProject\\Imagens.py")
Imagens = importlib.util.module_from_spec(spec)
spec.loader.exec_module(Imagens)


def login(x, y):
    py.click(x, y)
    while verificar(Imagens.Imagens.conta1) is False:
        sleep(0.1)
    py.press('tab', 5)
    sleep(1)
    py.press('enter')
    sleep(1.5)
    a = 0
    while verificar(Imagens.Imagens.log33) is False and a != 5:
        sleep(1)
        a += 1
    log3 = py.locateCenterOnScreen(r'E:\Backup\backup PC\Imagens\log33.png')
    if log3:
        py.click(log3)
        sleep(4)


def verificar(imagem, left=None, top=None, width=None, height=None):
    if left:
        if py.locateOnScreen(imagem, region=(left, top, width, height)):
            return True
        return False
    else:
        if py.locateCenterOnScreen(imagem):
            return True
        else:
            return False


def esperar(imagem):
    while verificar(imagem) is False:
        sleep(0.2)


def inicio():
    r = randint(1, 5)
    winsound.PlaySound(f'E:\\Backup\\Musicas\\intro{r}.wav', winsound.SND_ASYNC)


def powersheel(comando):
    os.system(f'powershell /c {comando}')


def resolver():
    global c
    powersheel(r'Start-Process -WindowStyle hidden -FilePath C:\Users\Gabri\Documents\dpclat.exe')
    while not window.getWindowsWithTitle("Error"):
        sleep(0.2)
        c += 1
        if c == 5:
            break
    if window.getWindowsWithTitle("Error"):
        window.getWindowsWithTitle("Error")[0].close()
    powersheel(r'Start-Process -WindowStyle hidden -FilePath C:\Users\Gabri\Documents\dpclat.exe')


def som():
    global f

    threading.Thread(target=resolver).start()

    if verificar(Imagens.Imagens.mais, 1799, 1042, 21, 38):
        py.leftClick(1799, 1055)
    else:
        py.leftClick(1775, 1055)
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
        sleep(0.2)
    sleep(1)
    try:
        py.leftClick(Imagens.Imagens.conf2)
    except:
        py.leftClick(Imagens.Imagens.conf)

    pos1 = py.position()
    py.doubleClick(pos1[0] - 34, pos1[1] + 82)
    py.doubleClick(pos1[0] - 34, pos1[1] + 82)
    py.doubleClick(pos1[0] - 34, pos1[1] + 82)

    sleep(1.5)

    pos = py.position()
    py.doubleClick(pos[0] - 70, pos[1])
    py.doubleClick(pos[0] - 70, pos[1])
    py.doubleClick(pos[0] - 70, pos[1])

    sleep(1)

    window.getWindowsWithTitle("Razer")[0].close()


def google():
    sites = ['https://www.youtube.com', 'https://www.imissmybar.com/',
             'https://mail.google.com/mail/u/0/?zx=7quikovz9bly#inbox']
    webbrowser.register('chrome',
                        None,
                        webbrowser.BackgroundBrowser(r"C:\Program Files\Google\Chrome\Application\chrome.exe"))
    for a in sites:
        webbrowser.open(a)
        sleep(1)
    sleep(0.5)
    if verificar(Imagens.Imagens.max) is False:
        try:
            py.click(Imagens.Imagens.max22)
        except:
            py.click(Imagens.Imagens.max33)
            try:
                py.click(Imagens.Imagens.max22)
            except:
                py.click(Imagens.Imagens.max33)
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
    sleep(2)
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
        sleep(0.2)
    sleep(0.5)
    for a, b in enumerate(barras):
        py.leftClick(barra, barras[a])
        sleep(0.5)
    for b, c in enumerate(plays):
        py.leftClick(play, plays[b])
        sleep(0.5)

    py.leftClick(x=25, y=14)
    if f != 0:
        reserva()


def googlefds():
    webbrowser.register('chrome',
                        None,
                        webbrowser.BackgroundBrowser(r"C:\Program Files\Google\Chrome\Application\chrome.exe"))
    sleep(0.5)
    webbrowser.get('chrome').open('https://mail.google.com/mail/u/0/?zx=7quikovz9bly#inbox')
    sleep(1)
    sleep(0.5)
    if f != 0:
        reserva()


def reserva():
    py.click(x=1919, y=1076)

    try:
        py.leftClick(py.locateOnScreen(Imagens.Imagens.mais))
        sleep(2)
        py.doubleClick(py.locateOnScreen(Imagens.Imagens.razer2))
        sleep(2)
        aaaaa = py.locateOnScreen(Imagens.Imagens.teste)
        py.moveTo(aaaaa[0] + 200, aaaaa[1] + 150)
        sleep(2)
        py.click(aaaaa[0] - 100, aaaaa[1] + 160)
    except:
        pass

    py.click(x=1919, y=1076)
    py.moveTo(x=922, y=564)


if dia_semana < 5:
    # inicio()
    som()
    google()
    py.alert(f"Processo finalizado!\nTenha uma boa {sem[dia]}-Feira =D{texto}")
else:
    # inicio()
    som()
    googlefds()
    py.alert(f"Processo finalizado!\nTenha um bom {sem[dia]} =D{texto}")
