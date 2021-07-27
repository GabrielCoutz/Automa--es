import pyautogui as py
from time import sleep
import os
import importlib.util
import psutil
import pygetwindow as window

spec = importlib.util.spec_from_file_location(
    "name", "C:\\Users\\Gabri\\PycharmProjects\\pythonProject\\Imagens.py")
Imagens = importlib.util.module_from_spec(spec)
spec.loader.exec_module(Imagens)
f, c = 0, 0


def finalizar(a):
    py.rightClick(a)
    sleep(0.5)
    py.press('down')
    sleep(0.5)
    py.press('enter')


def verificar(a):
    if py.locateCenterOnScreen(a):
        return True
    return False


def powersheel(comando):
    import os
    os.system(f'powershell /c {comando}')


def resolver():
    powersheel(r'Start-Process -WindowStyle hidden -FilePath C:\Users\Gabri\Documents\dpclat.exe')


def fechar(name):
    os.system("taskkill /f /im " + name)


def esperar(imagem):
    while verificar(imagem) is False:
        pass


py.alert(title='Protocolo De Som', text='Este protocolo será iniciado!\nNão mexa no computador até que termine!!!')
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
            py.click(aaaaa[0] - 100, aaaaa[1] + 200)
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

sleep(1.3)

pos = py.position()
py.leftClick(pos[0] - 70, pos[1])
py.leftClick(pos[0] - 70, pos[1])
py.leftClick(pos[0] - 70, pos[1])
sleep(1)

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
            py.click(aaaaa[0] - 100, aaaaa[1] + 200)
        else:
            pass
    except:
        pass
py.alert(title='Protocolo Finalizado', text='Computador Liberado!')
