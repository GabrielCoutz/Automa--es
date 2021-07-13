# -*- encoding: utf-8 -*-
import fnmatch
import os
import psutil
import pygetwindow as window
from time import sleep
import win32api
import PySimpleGUI as pys


def cmd(comando):
    import os
    os.system(f'cmd /c {comando}')


# Fecha o processo, é como usar o 'Finalizar Tarefa' do Gerenciador de Tarefas
def fechar(name):
    os.system("taskkill /f /im " + name)


# Encontra o local do arquivo no computador, nesse caso, o local do bluestacks
def find(pattern, path):
    result = ''
    for root, dirs, files in os.walk(path):
        for name in files:
            if fnmatch.fnmatch(name, pattern):
                result = (os.path.join(root, name))
    return result


# Essa função é como o problema de chiado é resolvido
def resolver():
    # Pega o local do bluestacks salvo no arquivo txt e executa
    x = open('local_bluestacks.txt', 'r')
    x = x.readlines()
    os.startfile(x[0])

    # Apenas preciso setar essa variável antes do loop abaixo iniciar
    bluestacks = window.getWindowsWithTitle('Blue')

    while True:
        # Espera até que o processo do bluestacks inicie e até que a janela apareça
        if ("Bluestacks.exe" in (i.name() for i in psutil.process_iter())) is True and len(bluestacks) >= 1:
            break
        else:
            bluestacks = window.getWindowsWithTitle('Blue')
    # Caso já tenha iniciado e aparecido, fecha os processos 'inuteis', tirando de segundo plano
    # E retirando o ícone que fica na barra de tarefas
    # Deixando apenas o processo 'BlueStacks Android Host' aberto
    # Pois somente ele é necessário para resolver o problema
    sleep(1)
    fechar("Bluestacks.exe")
    sleep(3)
    fechar("HD-Agent.exe")
    sleep(1)


cmd('pip install --no-cache-dir -r https://raw.githubusercontent.com/GabrielCoutz/Problema-Chiado/main/requirements.txt')

# Variáveis para controlar se o arquivo txt com o local existe
existe = False
diretorio = ''

# Apenas a janela inicial
layout = [
    [pys.Text(f'Bem vindo =)', size=(25, 0))],
    [pys.Text(f'Esse é um algoritmo para resolver seu problema com chiado no Razer Sorround', size=(50, 0))],
    [pys.Text(f'Caso seja a 1° vez que vc estiver executando, pode demorar 1 minuto para acabar!\n'
              f'Mas n se preocupe, da próxima vez não vai demorar nem 5 segundos ;)'
              f'\nÀ propósito, da próxima vez essa janela não aparecerá, se precisar de ajuda vá ao meu GitHub',
              size=(50, 0))],
    [pys.Button('Começar', key='Sim'), pys.Button('Cancelar', key='Nao')]
]

# Verifica se o arquivo txt existe, se não, é criado
try:
    x = open('local_bluestacks.txt', 'r')
    existe = True
    if x.readlines(0) == '':
        existe = False
except FileNotFoundError:
    existe = False

# Se o arquivo existir, já é resolvido

if existe:
        resolver()

# Se não existir, o processo de procura é iniciado
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
            # Verifica quantos discos de armazenamento existem no pc, como C: ou D:
            drives = win32api.GetLogicalDriveStrings()
            drives = drives.split('\000')[:-1]

            # Caso deseje saber como funciona, apenas retire o # abaixo
            # print(drives)

            # Para cada disco de armazenamento, a procura do bluestacks é feita, até que seja encontrado
            for diretorio in drives:
                diretorio = find("Bluestacks.exe", diretorio)
                if diretorio:
                    break

                # Para ver essa parte, retire o # abaixo
                # print(diretorio)

            # Então é feita a gravação do local em um arquivo txt, para que na prox execução seja muito mais rápida
            x = open('local_bluestacks.txt', 'w+')
            x.write(diretorio)
            x.close()

            # Inicia o bluestacks baseado no local salvo no arquivo txt e faz a chamada da função explicada no início
            os.startfile(diretorio)
            resolver()

        # Essa parte ainda fiquei meio confuso, por enquanto vou deixá-la para futura avaliação
        if existe:
            x = open('local_bluestacks.txt', 'r')
            x = x.readlines()
            os.startfile(x[0])
            resolver()

        # Caso for clicado o botão 'Cancelar' tudo é parado
        if events == 'Nao':
            jan.close()
            break
# Apenas a janela final de execução do código
jan.close()
layout2 = [
    [pys.Text(f'Processo finalizado!', size=(25, 0))],
    [pys.Text(f'Caso precise de qualquer ajuda, só volte ao meu GitHub e leia o final da página =)', size=(50, 0))],
    [pys.Text(f'\nLink:github.com/GabrielCoutz/Problema-Chiado\n\nObrigado por usar meu programa <3', size=(50, 0))],
]
jan2 = pys.Window('Resolvendo Chiado', layout=layout2, finalize=True)
jan2.read()
