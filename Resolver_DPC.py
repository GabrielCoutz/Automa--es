# -*- encoding: utf-8 -*-
import winsound
import pygetwindow as window
from time import sleep
import PySimpleGUI as pys


def cmd(requirements):
    import os
    os.system(f'cmd /c pip install --no-cache-dir {requirements}')


def powersheel(comando):
    import os
    os.system(f'powershell /c {comando}')


def resolver():
    c = 0
    powersheel(r'Start-Process -WindowStyle hidden -FilePath C:\Users\Gabri\Documents\dpclat.exe')
    while not window.getWindowsWithTitle("Error"):
        print(c)
        sleep(0.2)
        c += 1
        if c == 20:
            break
    if window.getWindowsWithTitle("Error") and c > 0:
        xamp = window.getWindowsWithTitle("Error")
        xamp[0].close()
    else:
        pass
    powersheel(r'Start-Process -WindowStyle hidden -FilePath C:\Users\Gabri\Documents\dpclat.exe')


cmd('''-r https://raw.githubusercontent.com/GabrielCoutz/Problema-Chiado/main/requirements.txt''')


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
    Esse bloco de notas foi criado apenas para controle do programa, caso ele não existir significa que
    é a primeira vez que está sendo executado, ou seja, irá aparecer a caixa de mensagem inicial.
    Caso já exista, significa que já foi executado em algum momento, então apenas vai executar direto.
    Pode ignorar kkkk""")
    x.close()

jan = pys.Window('Resolvendo Chiado', layout=layout, finalize=True)
if primeira_vez:
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
