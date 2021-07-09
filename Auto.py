# -*-coding: utf-8-*-
import pyautogui as py
from time import sleep
import webbrowser
import winsound
from random import randint
from datetime import date
import locale
import os

app = r'E:\Backup\backup PC\Imagens\app.png'
mais = r'E:\Backup\backup PC\Imagens\mais.png'
razer2 = r'E:\Backup\backup PC\Imagens\razer2.png'
razera = r'E:\Backup\backup PC\Imagens\razer.png'
conf = r'E:\Backup\backup PC\Imagens\conf.png'
conf2 = r'E:\Backup\backup PC\Imagens\conf2.png'
fechar = r'E:\Backup\backup PC\Imagens\fechar.png'
blue2 = r'E:\Backup\backup PC\Imagens\Blue2.png'
blue42 = r'E:\Backup\backup PC\Imagens\Blue42.png'
blue = r'E:\Backup\backup PC\Imagens\Blue.png'
blue43 = r'E:\Backup\backup PC\Imagens\Blue4.png'
blue3 = r'E:\Backup\backup PC\Imagens\Blue3.png'
agent = r'E:\Backup\backup PC\Imagens\Agent.png'
f = r'E:\Backup\backup PC\Imagens\Fechar2.png'
loc = r'E:\Backup\backup PC\Imagens\loc.png'

locale.setlocale(locale.LC_ALL, 'pt_BR.utf8')


def finalizar(a):
    py.rightClick(a)
    sleep(0.5)
    py.press('down')
    sleep(0.5)
    py.press('enter')


def inicio():
    py.alert("Escolhi uma música de sua playlist, espero que goste =)\n"
             "Te aviso quando acabar ;)")
    r = randint(1, 5)
    winsound.PlaySound(f'E:\\Backup\\Musicas\\intro{r}.wav', winsound.SND_ASYNC)


def som():
    os.startfile(r"C:\Program Files\BlueStacks\Bluestacks.exe")
    sleep(8)
    py.leftClick(x=1917, y=1078)
    sleep(2)
    py.leftClick(mais)
    sleep(2)
    razer2 = py.locateCenterOnScreen(r'E:\Backup\backup PC\Imagens\razer2.png')
    py.doubleClick(razer2)
    sleep(2)
    py.leftClick(razer2[0] + 92, razer2[1] - 150)
    sleep(2)
    py.leftClick(x=1565, y=849)

    try:
        py.doubleClick(razera)
        sleep(0.5)
    except:
        py.leftClick(mais)
        sleep(1)
        py.doubleClick(razera)
    sleep(1)

    try:
        py.moveTo(loc)
    except:
        py.leftClick(mais)
        sleep(1)
        py.doubleClick(razera)
        sleep(1)
    try:
        py.leftClick(conf2)
    except:
        py.leftClick(conf)

    pos1 = py.position()
    xp2 = pos1[0]
    yp2 = pos1[1]
    py.leftClick(xp2 - 34, yp2 + 82)
    py.leftClick(xp2 - 34, yp2 + 82)

    sleep(1.3)

    pos = py.position()
    xp = pos[0]
    yp = pos[1]
    py.leftClick(xp - 70, yp)
    py.leftClick(xp - 70, yp)
    sleep(1)

    py.moveTo(fechar)
    py.doubleClick()
    py.doubleClick()

    py.hotkey('ctrlleft', 'shift', 'esc')
    sleep(4)

    py.doubleClick(blue)

    sleep(0.5)

    try:
        finalizar(blue2)
        py.moveTo(app)
    except:
        try:
            finalizar(blue42)
            py.moveTo(app)
        except:
            try:
                py.locateCenterOnScreen(blue)
                sleep(1)
                finalizar(blue43)
            except:
                pass

    sleep(0.5)

    sleep(1)
    py.scroll(-1000)

    try:
        py.locateCenterOnScreen(agent)
        finalizar(agent)
    except:
        pass

    py.leftClick(f)


def google():
    url = 'google.com'
    webbrowser.register('chrome',
                        None,
                        webbrowser.BackgroundBrowser(r"C:\Program Files\Google\Chrome\Application\chrome.exe"))
    sleep(0.5)
    webbrowser.get('chrome').open(url)
    sleep(1.2)
    webbrowser.open('https://www.youtube.com/results?search_query=Lofi')
    sleep(0.5)
    webbrowser.open('https://www.imissmybar.com/')
    sleep(0.5)
    webbrowser.open('https://mail.google.com/mail/u/0/?zx=7quikovz9bly#inbox')
    sleep(0.5)
    webbrowser.open('https://osu.ppy.sh/beatmapsets?m=0')
    sleep(0.5)
    py.leftClick(x=164, y=17)
    py.hotkey('ctrlleft', 'w')
    sleep(0.5)
    py.rightClick(x=164, y=17)
    py.press('down')
    sleep(0.5)
    py.press('down')
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
    py.press('down')
    sleep(0.5)
    py.press('down')
    sleep(0.5)
    py.press('enter')
    sleep(0.5)
    py.press('down')
    sleep(0.5)
    py.press('enter')
    sleep(0.5)
    py.leftClick(x=365, y=12)
    sleep(0.5)
    py.rightClick()
    py.press('down', 8)
    sleep(0.5)
    py.press('enter')
    sleep(10)
    py.leftClick(x=1593, y=389)
    sleep(0.2)
    py.leftClick(x=1564, y=387)
    sleep(0.5)
    py.leftClick(x=1593, y=454)
    sleep(0.2)
    py.leftClick(x=1564, y=456)
    sleep(0.5)
    py.leftClick(x=1593, y=579)
    sleep(0.2)
    py.leftClick(x=1564, y=577)
    sleep(0.5)
    py.leftClick(x=1593, y=702)
    sleep(0.2)
    py.leftClick(x=1564, y=705)
    sleep(0.5)
    py.leftClick(x=1593, y=765)
    sleep(0.2)
    py.leftClick(x=1564, y=766)
    sleep(0.5)
    py.leftClick(x=25, y=14)
    sleep(0.5)
    py.moveTo(x=922, y=564)


def googlefds():
    url = 'google.com'
    webbrowser.register('chrome',
                        None,
                        webbrowser.BackgroundBrowser(r"C:\Program Files\Google\Chrome\Application\chrome.exe"))
    sleep(0.5)
    webbrowser.get('chrome').open(url)
    sleep(1)
    webbrowser.open('https://mail.google.com/mail/u/0/?zx=7quikovz9bly#inbox')
    sleep(0.3)
    webbrowser.open('https://osu.ppy.sh/beatmapsets?m=0')
    sleep(0.5)
    py.leftClick(x=164, y=17)
    sleep(0.5)
    py.hotkey('ctrlleft', 'w')
    sleep(0.5)
    py.moveTo(x=922, y=564)


num = date.today().weekday()

sem = ("Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo")

if num < 5:
    inicio()
    som()
    google()
    py.alert(f"Processo finalizado!\nTenha uma boa {sem[num]}-Feira =D")
else:
    inicio()
    som()
    googlefds()
    py.alert(f"Processo finalizado!\nTenha um bom {sem[num]} =D")
