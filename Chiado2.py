# -*- encoding: utf-8 -*-
import fnmatch
import os
import winsound
import pygetwindow as window
from time import sleep
import win32api
import PySimpleGUI as pys


def powersheel(comando):
    import os
    os.system(f'powershell /c {comando}')


def find(pattern, path):
    result = ''
    for root, dirs, files in os.walk(path):
        for name in files:
            if fnmatch.fnmatch(name, pattern):
                result = (os.path.join(root, name))
    return result


def resolver(diretorio):
    powersheel(f'Start-Process -WindowStyle hidden -FilePath {diretorio}\.\dpclat.exe')


layout = [
    [pys.Text('Bem vindo =)', size=(25, 0))],
    [pys.Text('Esse é um algoritmo para resolver seu problema com chiado no Razer Sorround', size=(50, 0))],
    [pys.Text('Caso seja a 1° vez que vc estiver executando, pode demorar 1 minuto para acabar!\n'
              'Mas n se preocupe, da próxima vez não vai demorar nem 5 segundos ;)'
              '\nÀ propósito, da próxima vez essa janela não aparecerá, se precisar de ajuda vá ao meu GitHub',
              size=(50, 0))],
    [pys.Button('Começar', key='Sim'), pys.Button('Cancelar', key='Nao')]
]
layout_encontrou = [
    [pys.Text(
        'O diretório do BlueStacks foi encontrado com sucesso! XD\nPodemos continuar?', size=(45, 0))],
    [pys.Button('Sim', key='S_find'), pys.Button('Não', key='N_find')]
]
existe = False
c = 0
try:
    x = open('local_dpclatency.txt', 'r')
    existe = True
    if x.readlines(0) == '':
        existe = False
except FileNotFoundError:
    existe = False


if existe:
    x = open('local_dpclatency.txt', 'r')
    x = x.readlines()
    diretorio = (x[0])
    resolver(diretorio)
    while True:
        if c == 5000:
            break
        if window.getWindowsWithTitle('Error'):
            erro = window.getWindowsWithTitle("Error")
            window.Window.close(erro[0])
            sleep(1)
            resolver(diretorio)
            break
        else:
            c += 1

# E:\Users\gabri\Downloads\dpclat.exe
drives = win32api.GetLogicalDriveStrings()
drives = drives.split('\000')[:-1]
c = 0
jan = pys.Window('Resolvendo Chiado', layout=layout, finalize=True)
if not existe:
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
            for diretorio in drives:
                print('procurando')
                diretorio = find("dpclat.exe", diretorio)
                print(f'qm leu é corno {diretorio}')
                if diretorio:
                    print(diretorio)
                    jan_find = pys.Window('Resolvendo Chiado', layout=layout_encontrou, finalize=True)
                    events, value2 = jan_find.read()
                    if events == pys.WIN_CLOSED:
                        break
                    if events == 'N_find':
                        jan_find.close()
                        break
                    if events == 'S_find':
                        jan_find.close()
                        diretorio = diretorio.replace('\dpclat.exe', '')
                        x = open('local_dpclatency.txt', 'w+')
                        x.write(diretorio)
                        x.close()
                        resolver(diretorio)
                        while True:
                            if c == 5000:
                                break
                            if window.getWindowsWithTitle('Error'):
                                erro = window.getWindowsWithTitle("Error")
                                window.Window.close(erro[0])
                                sleep(1)
                                resolver(diretorio)
                                break
                            else:
                                c += 1
                else:
                    print('num achei')
jan.close()
layout_final = [
    [pys.Text('Processo finalizado!', size=(25, 0))],
    [pys.Text('Caso precise de qualquer ajuda, só volte ao meu GitHub e leia o final da página =)', size=(50, 0))],
    [pys.Text(r'\nLink:github.com/GabrielCoutz/Problema-Chiado\n\nObrigado por usar meu programa <3', size=(50, 0))],
]
jan_final = pys.Window('Resolvendo Chiado', layout=layout_final, finalize=True)
jan_final.read()
