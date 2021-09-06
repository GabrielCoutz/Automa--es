# -*- encoding: utf-8 -*-
import winsound
import pygetwindow as window
import PySimpleGUI as pys
import ctypes
import shutil
from ctypes import windll, wintypes
from uuid import UUID
from time import sleep


class GUID(ctypes.Structure):
    _fields_ = [
        ("Data1", wintypes.DWORD),
        ("Data2", wintypes.WORD),
        ("Data3", wintypes.WORD),
        ("Data4", wintypes.BYTE * 8)
    ]

    def __init__(self, uuidstr):
        uuid = UUID(uuidstr)
        ctypes.Structure.__init__(self)
        self.Data1, self.Data2, self.Data3, \
        self.Data4[0], self.Data4[1], rest = uuid.fields
        for i in range(2, 8):
            self.Data4[i] = rest >> (8 - i - 1) * 8 & 0xff


def _get_known_folder_path(uuidstr):
    SHGetKnownFolderPath = windll.shell32.SHGetKnownFolderPath
    SHGetKnownFolderPath.argtypes = [
        ctypes.POINTER(GUID), wintypes.DWORD,
        wintypes.HANDLE, ctypes.POINTER(ctypes.c_wchar_p)
    ]
    pathptr = ctypes.c_wchar_p()
    guid = GUID(uuidstr)
    if SHGetKnownFolderPath(ctypes.byref(guid), 0, 0, ctypes.byref(pathptr)):
        raise ctypes.WinError()
    return pathptr.value


def get_download_folder():
    FOLDER_ID = '{B97D20BB-F46A-4C97-BA10-5E3608430854}'
    return str(_get_known_folder_path(FOLDER_ID))


def cmd(comando):
    import os
    os.system(f'cmd /c {comando}')


def powersheel(comando):
    import os
    os.system(f'powershell /c {comando}')


def resolver():
    c = 0
    powersheel(r'Start-Process -WindowStyle hidden -FilePath lib\dpclat.exe')
    while not window.getWindowsWithTitle("Error"):
        sleep(0.2)
        c += 1
        if c == 5:
            break
    # if window.getWindowsWithTitle("Error"):
    #     sleep(1)
    #     razer[0].close()
    # powersheel(r'Start-Process -WindowStyle hidden -FilePath lib\dpclat.exe')
    if window.getWindowsWithTitle("Error"):
        sleep(0.3)
        cmd('TASKKILL /IM dpclat.exe')
    else:
        pass
    try:
        if window.getWindowsWithTitle("Error"):
            window.getWindowsWithTitle("Error")[0].close()
    except:
        pass
    powersheel(r'Start-Process -WindowStyle hidden -FilePath lib\dpclat.exe')


def mover():
    pasta_inicializar = get_download_folder()
    original = r'lib\Resolver_DPC - Atalho.lnk'
    shutil.move(original, pasta_inicializar)


# cmd(
#     '''pip install --noconsole --no-cache-dir -r
#     https://raw.githubusercontent.com/GabrielCoutz/Problema-Chiado/main/requirements.txt''')

layout = [
    [pys.Text('Bem vindo =)', size=(25, 0))],
    [pys.Text('Esse é um algoritmo para resolver seu problema com chiado no Razer Sorround', size=(50, 0))],
    [pys.Text('Clique em "Começar" e pode deixar o resto comigo =D'
              '\n\nSe precisar de qualquer ajuda vá ao meu GitHub',
              size=(50, 0))],
    [pys.Button('Começar', key='Sim'), pys.Button('Cancelar', key='Nao')]
]

primeira_vez = True

try:
    x = open('lib/primeira_vez.txt', 'r')
    winsound.PlaySound(r'lib\\Musica_Maneira.wav', winsound.SND_ASYNC)
    resolver()
    primeira_vez = False


except FileNotFoundError:
    x = open('lib/primeira_vez.txt', 'w')
    x.write("""
            Esse bloco de notas foi criado apenas para controle do programa, caso ele não exista, significa que
            é a primeira vez que está sendo executado, ou seja, irá aparecer a caixa de mensagem inicial.
            Caso já exista, significa que já foi executado em algum momento, então apenas vai abrir direto.""")
    x.close()

jan = pys.Window('Resolvendo Chiado', layout=layout, finalize=True)
if primeira_vez:
    try:
        mover()
    except:
        pass
    while True:
        events, value = jan.read()
        if events == pys.WIN_CLOSED:
            break
        if events == 'Nao':
            jan.close()
            break
        if events == 'Sim':
            jan.close()
            winsound.PlaySound(r'lib\\Musica_Maneira.wav', winsound.SND_ASYNC)
            resolver()
jan.close()
layout_final = [
    [pys.Text('Processo finalizado!\n\nEstou tocando uma música para verificar se ainda está com chiado!\n'
              '\nSe ainda estiver ouvindo um chiado volte ao meu GitHub e leia o final da página =/', size=(50, 0))],
    [pys.Text('\nLink: https://github.com/GabrielCoutz/Usando-DPC\n\nObrigado por usar meu programa <3', size=(50, 0))],
]
jan_final = pys.Window('Resolvendo Chiado', layout=layout_final, finalize=True)
jan_final.read()
