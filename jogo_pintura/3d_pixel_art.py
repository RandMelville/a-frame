import pygame
import sys
import tkinter as tk
from tkinter import colorchooser, filedialog
import math

# Inicialize o Pygame
pygame.init()

# Defina algumas constantes
SCREEN_WIDTH = 640
SCREEN_HEIGHT = 480
CELL_SIZE = 10
GRID_WIDTH = SCREEN_WIDTH // CELL_SIZE
GRID_HEIGHT = SCREEN_HEIGHT // CELL_SIZE
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
BUTTON_COLOR = (100, 100, 255)
SELECTED_BUTTON_COLOR = (255, 100, 100)

# Cores adicionais
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)
CYAN = (0, 255, 255)
MAGENTA = (255, 0, 255)

# Função para abrir a paleta de cores do sistema
def pick_color():
    color = colorchooser.askcolor()[0]
    if color:
        return color
    else:
        return BLACK

# Função para carregar uma imagem
def load_image():
    root = tk.Tk()
    root.withdraw()  # Esconda a janela principal
    file_path = filedialog.askopenfilename()
    if file_path:
        return pygame.image.load(file_path)
    else:
        return None

# Funções para desenhar formas geométricas 3D
def draw_cube(x, y, size, color):
    # Aumente o tamanho do cubo
    enlarged_size = int(size * 1.5)
    
    # Desenhe as faces do cubo
    pygame.draw.rect(screen, color, (x, y, enlarged_size, enlarged_size))
    pygame.draw.polygon(screen, color, [(x, y), (x + enlarged_size, y), (x + 2.25 * size, y - 0.75 * size), (x + 0.75 * size, y - 0.75 * size)])
    pygame.draw.polygon(screen, color, [(x + enlarged_size, y), (x + enlarged_size, y + enlarged_size), (x + 2.25 * size, y + 0.75 * size), (x + 2.25 * size, y - 0.75 * size)])
    pygame.draw.polygon(screen, color, [(x, y + enlarged_size), (x + enlarged_size, y + enlarged_size), (x + 2.25 * size, y + 0.75 * size), (x + 0.75 * size, y + 0.75 * size)])
    
    # Desenhe as arestas do cubo
    pygame.draw.lines(screen, BLACK, True, [(x, y), (x + enlarged_size, y), (x + 2.25 * size, y - 0.75 * size), (x + 0.75 * size, y - 0.75 * size)], 2)
    pygame.draw.lines(screen, BLACK, True, [(x + enlarged_size, y), (x + enlarged_size, y + enlarged_size), (x + 2.25 * size, y + 0.75 * size), (x + 2.25 * size, y - 0.75 * size)], 2)
    pygame.draw.lines(screen, BLACK, True, [(x, y + enlarged_size), (x + enlarged_size, y + enlarged_size), (x + 2.25 * size, y + 0.75 * size), (x + 0.75 * size, y + 0.75 * size)], 2)

def draw_sphere(x, y, size, color):
    # Calcula o raio da esfera
    radius = size // 3  # Tornando o raio um pouco menor

    # Desenha a esfera
    for i in range(x - radius, x + radius + 1):
        for j in range(y - radius, y + radius + 1):
            distance = math.sqrt((i - x) ** 2 + (j - y) ** 2)
            if distance <= radius:
                brightness = 1 - (distance / radius) ** 2
                shade = (int(color[0] * brightness), int(color[1] * brightness), int(color[2] * brightness))
                pygame.draw.rect(screen, shade, (i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE))

# Crie a tela
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Pixel Art Creator")

# Crie uma grade para armazenar as cores dos pixels
grid = [[WHITE for _ in range(GRID_WIDTH)] for _ in range(GRID_HEIGHT)]

def draw_grid():
    for y, row in enumerate(grid):
        for x, color in enumerate(row):
            pygame.draw.rect(screen, color, (x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE))

def get_grid_pos(pos):
    x, y = pos
    grid_x = x // CELL_SIZE
    grid_y = y // CELL_SIZE
    return grid_x, grid_y

# Botão para apagar tudo
clear_rect = pygame.Rect(10, SCREEN_HEIGHT - 50, 120, 30)
clear_font = pygame.font.Font(None, 20)
clear_text = clear_font.render("Clear All", True, BLACK)

# Botão para selecionar cor
color_picker_rect = pygame.Rect(160, SCREEN_HEIGHT - 50, 80, 30)
color_picker_font = pygame.font.Font(None, 20)
color_picker_text = color_picker_font.render("Pick Color", True, BLACK)

# Botão para anexar imagem
attach_image_rect = pygame.Rect(260, SCREEN_HEIGHT - 50, 120, 30)
attach_image_font = pygame.font.Font(None, 20)
attach_image_text = attach_image_font.render("Attach Image", True, BLACK)

# Botão para apagar a imagem
delete_image_rect = pygame.Rect(400, SCREEN_HEIGHT - 50, 120, 30)
delete_image_font = pygame.font.Font(None, 20)
delete_image_text = delete_image_font.render("Delete Image", True, BLACK)

# Botão para desfazer a última forma desenhada
undo_rect = pygame.Rect(540, SCREEN_HEIGHT - 50, 80, 30)
undo_font = pygame.font.Font(None, 20)
undo_text = undo_font.render("Undo", True, BLACK)

# Botões para selecionar formas geométricas 3D
draw_cube_rect = pygame.Rect(10, SCREEN_HEIGHT - 100, 80, 30)
draw_cube_font = pygame.font.Font(None, 20)
draw_cube_text = draw_cube_font.render("Cube", True, BLACK)

draw_sphere_rect = pygame.Rect(100, SCREEN_HEIGHT - 100, 120, 30)
draw_sphere_font = pygame.font.Font(None, 20)
draw_sphere_text = draw_sphere_font.render("Sphere", True, BLACK)

# Lista para armazenar formas 3D desenhadas
drawn_shapes = []

# Variáveis para controle de botões selecionados
selected_button = None
button_rects = [clear_rect, color_picker_rect, attach_image_rect, delete_image_rect, draw_cube_rect, draw_sphere_rect, undo_rect]

# Função para desenhar os botões
def draw_buttons():
    for rect in button_rects:
        if rect == selected_button:
            pygame.draw.rect(screen, SELECTED_BUTTON_COLOR, rect, border_radius=5)
        else:
            pygame.draw.rect(screen, BUTTON_COLOR, rect, border_radius=5)

    screen.blit(clear_text, (clear_rect.centerx - clear_text.get_width() // 2, clear_rect.centery - clear_text.get_height() // 2))
    screen.blit(color_picker_text, (color_picker_rect.centerx - color_picker_text.get_width() // 2, color_picker_rect.centery - color_picker_text.get_height() // 2))
    screen.blit(attach_image_text, (attach_image_rect.centerx - attach_image_text.get_width() // 2, attach_image_rect.centery - attach_image_text.get_height() // 2))
    screen.blit(delete_image_text, (delete_image_rect.centerx - delete_image_text.get_width() // 2, delete_image_rect.centery - delete_image_text.get_height() // 2))
    screen.blit(draw_cube_text, (draw_cube_rect.centerx - draw_cube_text.get_width() // 2, draw_cube_rect.centery - draw_cube_text.get_height() // 2))
    screen.blit(draw_sphere_text, (draw_sphere_rect.centerx - draw_sphere_text.get_width() // 2, draw_sphere_rect.centery - draw_sphere_text.get_height() // 2))
    screen.blit(undo_text, (undo_rect.centerx - undo_text.get_width() // 2, undo_rect.centery - undo_text.get_height() // 2))


# Loop principal
running = True
drawing = False
selected_color = BLACK
attached_image = None
selected_shape = "square"
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.MOUSEBUTTONDOWN:
            if event.button == 1:
                # Verifique se algum botão foi clicado
                for rect in button_rects:
                    if rect.collidepoint(event.pos):
                        selected_button = rect
                        break

                if clear_rect.collidepoint(event.pos):
                    grid = [[WHITE for _ in range(GRID_WIDTH)] for _ in range(GRID_HEIGHT)]
                    drawn_shapes = []
                elif color_picker_rect.collidepoint(event.pos):
                    selected_color = pick_color()
                elif attach_image_rect.collidepoint(event.pos):
                    attached_image = load_image()
                elif delete_image_rect.collidepoint(event.pos):
                    attached_image = None
                elif draw_cube_rect.collidepoint(event.pos):
                    selected_shape = "cube"
                elif draw_sphere_rect.collidepoint(event.pos):
                    selected_shape = "sphere"
                elif undo_rect.collidepoint(event.pos):
                    if drawn_shapes:
                        drawn_shapes.pop()  # Remova a última forma desenhada
                else:
                    drawing = True
                    pos = get_grid_pos(pygame.mouse.get_pos())
                    if selected_shape == "square":
                        pygame.draw.rect(screen, selected_color, (pos[0] * CELL_SIZE, pos[1] * CELL_SIZE, CELL_SIZE, CELL_SIZE))
                        drawn_shapes.append(("square", pos[0] * CELL_SIZE, pos[1] * CELL_SIZE, CELL_SIZE, selected_color))
                    elif selected_shape == "cube":
                        draw_cube(pos[0] * CELL_SIZE, pos[1] * CELL_SIZE, CELL_SIZE, selected_color)
                        drawn_shapes.append(("cube", pos[0] * CELL_SIZE, pos[1] * CELL_SIZE, CELL_SIZE, selected_color))
                    elif selected_shape == "sphere":
                        draw_sphere(pos[0], pos[1], CELL_SIZE, selected_color)
                        drawn_shapes.append(("sphere", pos[0], pos[1], CELL_SIZE, selected_color))
                
        elif event.type == pygame.MOUSEBUTTONUP:
            if event.button == 1:
                drawing = False
        elif event.type == pygame.MOUSEMOTION:
            if drawing:
                pos = get_grid_pos(pygame.mouse.get_pos())
                if selected_shape == "square":
                    pygame.draw.rect(screen, selected_color, (pos[0] * CELL_SIZE, pos[1] * CELL_SIZE, CELL_SIZE, CELL_SIZE))
                    drawn_shapes.append(("square", pos[0] * CELL_SIZE, pos[1] * CELL_SIZE, CELL_SIZE, selected_color))
                elif selected_shape == "cube":
                    draw_cube(pos[0] * CELL_SIZE, pos[1] * CELL_SIZE, CELL_SIZE, selected_color)
                    drawn_shapes.append(("cube", pos[0] * CELL_SIZE, pos[1] * CELL_SIZE, CELL_SIZE, selected_color))
                elif selected_shape == "sphere":
                    draw_sphere(pos[0], pos[1], CELL_SIZE, selected_color)
                    drawn_shapes.append(("sphere", pos[0], pos[1], CELL_SIZE, selected_color))
    
    screen.fill(WHITE)
    draw_grid()
    draw_buttons()
    
    # Desenhe a imagem anexada, se houver
    if attached_image:
        screen.blit(attached_image, (0, 0))
    
    # Desenhe as formas 3D desenhadas
    for shape in drawn_shapes:
        if shape[0] == "square":  # Draw square
            pygame.draw.rect(screen, shape[4], (shape[1], shape[2], shape[3], shape[3]))
        elif shape[0] == "cube":
            draw_cube(*shape[1:])
        elif shape[0] == "sphere":
            draw_sphere(*shape[1:])
    
    pygame.display.flip()

# Encerrar o Pygame
pygame.quit()
sys.exit()