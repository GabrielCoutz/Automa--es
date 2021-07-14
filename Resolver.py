# -*- encoding: utf-8 -*-
import fnmatch
import os
import winsound
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
    if 'Bluestacks.exe' in x[0]:
        os.startfile(x[0])
    else:
        return 'manu'
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


# Auto-explicativa kk, algumas janelas são ativadas para o usuário colocar o diretório do BlueStacks manualmente
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
            x = open('local_bluestacks.txt', 'w+')
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

layout_erro = [
    [pys.Text(f'Não foi possível encontrar o diretório do seu BlueStacks'
              f'\nDeseja colocá-lo manualmente?', size=(40, 0))],
    [pys.Button('Sim', key='S_erro'), pys.Button('Não', key='N_erro')]
]

layout_manual = [
    [pys.Text(f'Insira o local do seu BlueStacks\n\nExemplo: C:\Program Files\BlueStacks\Bluestacks.exe\n',
              size=(40, 0))],
    [pys.Input(key='manual')],
    [pys.Button('Salvar', key='S_manual'), pys.Button('Cancelar', key='N_manual')]
]

layout_aviso = [
    [pys.Text(
        f'Agora execute novamente e veja se o problema foi resolvido =)\n Caso não for, entre em contato pelo meu GitHub'
        f'\nLink:github.com/GabrielCoutz/Problema-Chiado', size=(50, 0))],
    [pys.Button('Salvar', key='S_aviso'), pys.Button('Cancelar', key='N_aviso')]
]

# Verifica se o arquivo txt existe, e muda a variavel 'existe' de acordo
try:
    x = open('local_bluestacks.txt', 'r')
    existe = True
    if x.readlines(0) == '':
        existe = False
except FileNotFoundError:
    existe = False

# Se o txt, já é resolvido
if existe:
    try:
        if resolver() == 'manu':
            manutencao()
    except:
        manutencao()

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
            winsound.PlaySound(r'lib\\Musica_Maneira.wav', winsound.SND_ASYNC)
            # Verifica quantos discos de armazenamento existem no pc, como C: ou D:
            drives = win32api.GetLogicalDriveStrings()
            drives = drives.split('\000')[:-1]

            # Caso deseje saber como funciona, apenas retire o # abaixos
            # print(drives)

            # Para cada disco de armazenamento, a procura do bluestacks é feita, até que seja encontrado
            for diretorio in drives:
                diretorio = find("Bluestacks.exe", diretorio)
                if diretorio:
                    # Então é feita a gravação do local em um arquivo txt
                    # Para que na prox execução seja muito mais rápida
                    x = open('local_bluestacks.txt', 'w+')
                    x.write(diretorio)
                    x.close()
                    # Inicia o bluestacks baseado no local salvo no arquivo txt
                    # Depois faz a chamada da função explicada no início
                    if resolver() == 'manu':
                        if manutencao() == 'parar':
                            break
                    break
                else:
                    # Caso não encontrar, a função manutenção é chamada para inserir o diretorio manualmente
                    manu = manutencao()
                    if manu == 'parar':
                        break
                # Para ver essa parte, retire o # abaixo
                # print(diretorio)

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
