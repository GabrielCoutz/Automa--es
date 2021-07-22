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


def manutencao():
    jan_erro = pys.Window('Resolvendo Chiado', layout=layout_erro, finalize=True)
    events, value = jan_erro.read()
    if events == pys.WIN_CLOSED:
        return 'parar'
    if events == 'N_erro':
        jan_erro.close()
        return 'parar'
    if events == 'S_erro':
        jan_erro.close()
        jan_manual = pys.Window('Resolvendo Chiado', layout=layout_manual, finalize=True)
        events, value = jan_manual.read()
        if events == pys.WIN_CLOSED:
            return 'parar'
        if events == 'N_manual':
            jan_manual.close()
            return 'parar'
        if events == 'S_manual':
            x = open('local_dpclatency.txt', 'w+')
            x.write(value['manual'])
            x.close()
            jan_manual.close()
            jan_aviso = pys.Window('Resolvendo Chiado', layout=layout_aviso, finalize=True)
            events, value = jan_aviso.read()
            if events == 'S_aviso':
                jan_aviso.close()
                return 'parar'
            if events == pys.WIN_CLOSED:
                return 'parar'
            if events == 'N_aviso':
                jan_aviso.close()
                return 'parar'


def cmd(comando):
    import os
    os.system(f'cmd /c {comando}')


# cmd('pip install --no-cache-dir -r https://raw.githubusercontent.com/GabrielCoutz/Problema-Chiado/main/requirements.txt')

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
        'O diretório do DPC Latency foi encontrado com sucesso! XD\nPodemos continuar?', size=(45, 0))],
    [pys.Button('Sim', key='S_find'), pys.Button('Não', key='N_find')]
]
layout_erro = [
    [pys.Text('Não foi possível encontrar o diretório do seu DPC Latency'
              '\nDeseja colocá-lo manualmente?', size=(40, 0))],
    [pys.Button('Sim', key='S_erro'), pys.Button('Não', key='N_erro')]
]
exemplo = r'E:\Users\gabri\Downloads'
layout_manual = [
    [pys.Text(f'Insira o local do seu BlueStacks\n\nExemplo: {exemplo}\n',
              size=(40, 0))],
    [pys.Input(key='manual')],
    [pys.Button('Salvar', key='S_manual'), pys.Button('Cancelar', key='N_manual')]
]

layout_aviso = [
    [pys.Text(
        'Agora execute novamente e veja se o problema foi resolvido =)\n Caso não for, entre em contato pelo meu GitHub'
        '\nLink:github.com/GabrielCoutz/Problema-Chiado', size=(50, 0))],
    [pys.Button('Salvar', key='S_aviso'), pys.Button('Cancelar', key='N_aviso')]
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
    try:
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
    except:
        manutencao()

drives = win32api.GetLogicalDriveStrings()
drives = drives.split('\000')[:-1]
drives = drives[::-1]

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
                diretorio = find("dpclat.exe", diretorio)
                if diretorio:
                    jan_find = pys.Window('Resolvendo Chiado', layout=layout_encontrou, finalize=True)
                    events, value2 = jan_find.read()
                    if events == pys.WIN_CLOSED:
                        break
                    if events == 'N_find':
                        jan_find.close()
                        break
                    if events == 'S_find':
                        jan_find.close()
                        diretorio = diretorio.replace(r'\dpclat.exe', '')
                        x = open('local_dpclatency.txt', 'w+')
                        x.write(diretorio)
                        x.close()
                        resolver(diretorio)
                        while c != 5000:
                            if window.getWindowsWithTitle('Error'):
                                erro = window.getWindowsWithTitle("Error")
                                window.Window.close(erro[0])
                                sleep(1)
                                resolver(diretorio)
                                break
                            else:
                                c += 1
                else:
                    c += 1
                if c == len(drives):
                    manu = manutencao()
                    if manu == 'parar':
                        break
jan.close()
layout_final = [
    [pys.Text('Processo finalizado!', size=(25, 0))],
    [pys.Text('Caso precise de qualquer ajuda, só volte ao meu GitHub e leia o final da página =)', size=(50, 0))],
    [pys.Text('\nLink:github.com/GabrielCoutz/Problema-Chiado\n\nObrigado por usar meu programa <3', size=(50, 0))],
]
jan_final = pys.Window('Resolvendo Chiado', layout=layout_final, finalize=True)
jan_final.read()
