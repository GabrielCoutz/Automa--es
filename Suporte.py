import pyautogui as py
from time import sleep
import os
import importlib.util
import pygetwindow as window
import threading

spec = importlib.util.spec_from_file_location(
    "name", "C:\\Users\\Gabri\\PycharmProjects\\pythonProject\\Imagens.py")
Imagens = importlib.util.module_from_spec(spec)
spec.loader.exec_module(Imagens)
f, c = 0, 0


def verificar(imagem, left=None, top=None, width=None, height=None):
    if left:
        if py.locateOnScreen(imagem, region=(left, top, width, height)):
            return True
        return False
    else:
        if py.locateCenterOnScreen(imagem, confidence=0.9):
            return True
        else:
            return False


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


def esperar(imagem):
    while verificar(imagem) is False:
        sleep(0.2)
    return ...


threading.Thread(target=resolver).start()

py.click(Imagens.Imagens.mais)
if verificar(Imagens.Imagens.razeratt) is False:
    try:
        esperar(Imagens.Imagens.razer2)
        py.doubleClick(py.locateOnScreen(Imagens.Imagens.razer2, confidence=0.9))
        esperar(Imagens.Imagens.teste)
        if verificar(Imagens.Imagens.mouse2):
            if verificar(Imagens.Imagens.mouse) is False:
                aaaaa = py.locateOnScreen(Imagens.Imagens.teste)
                py.moveTo(aaaaa[0] + 200, aaaaa[1] + 150)
                sleep(1)
                py.click(aaaaa[0] - 100, aaaaa[1] + 200)
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
py.leftClick(pos1[0] - 34, pos1[1] + 82)
py.leftClick(pos1[0] - 34, pos1[1] + 82)
py.leftClick(pos1[0] - 34, pos1[1] + 82)

sleep(1.3)

pos = py.position()
py.leftClick(pos[0] - 70, pos[1])
py.leftClick(pos[0] - 70, pos[1])
py.leftClick(pos[0] - 70, pos[1])
sleep(1)

window.getWindowsWithTitle("Razer")[0].close()

if f != 0:
    try:
        py.leftClick(py.locateOnScreen(Imagens.Imagens.mais))
        sleep(2)
        py.doubleClick(py.locateOnScreen(Imagens.Imagens.razer2, confidence=0.9))
        sleep(2)
        aaaaa = py.locateOnScreen(Imagens.Imagens.teste)
        py.moveTo(aaaaa[0] + 200, aaaaa[1] + 150)
        sleep(2)
        py.click(aaaaa[0] - 100, aaaaa[1] + 200)
    except:
        pass
py.alert(title='Protocolo Finalizado', text='Computador Liberado!')
