# -*- encoding: utf-8 -*-
import winsound
import pygetwindow as window
from time import sleep
import PySimpleGUI as pys


def powersheel(comando):
    import os
    os.system(f'powershell /c {comando}')


def resolver():
    powersheel(r'Start-Process -WindowStyle hidden -FilePath .\lib\dpclat.exe')


# cmd(
# 'pip install --no-cache-dir -r https://raw.githubusercontent.com/GabrielCoutz/Problema-Chiado/main/requirements.txt')

layout = [
    [pys.Text('Bem vindo =)', size=(25, 0))],
    [pys.Text('Esse é um algoritmo para resolver seu problema com chiado no Razer Sorround', size=(50, 0))],
    [pys.Text('Clique em "Começar" e pode deixar o resto comigo =D'
              '\n\nSe precisar de qualquer ajuda vá ao meu GitHub',
              size=(50, 0))],
    [pys.Button('Começar', key='Sim'), pys.Button('Cancelar', key='Nao')]
]

c = 0

jan = pys.Window('Resolvendo Chiado', layout=layout, finalize=True)
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
        while c != 5000:
            if window.getWindowsWithTitle('Error'):
                janela = window.getWindowsWithTitle("Error")
                window.Window.close(janela[0])
                sleep(1)
                resolver()
                break
jan.close()
layout_final = [
    [pys.Text('Processo finalizado!', size=(25, 0))],
    [pys.Text('Caso precise de qualquer ajuda, só volte ao meu GitHub e leia o final da página =)', size=(50, 0))],
    [pys.Text('\nLink:github.com/GabrielCoutz/Problema-Chiado\n\nObrigado por usar meu programa <3', size=(50, 0))],
]
jan_final = pys.Window('Resolvendo Chiado', layout=layout_final, finalize=True)
jan_final.read()
