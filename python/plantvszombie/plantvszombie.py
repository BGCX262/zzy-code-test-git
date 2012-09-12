#!/usr/bin/env python

import pygame, os#, sys
from pygame.locals import *
from gameobjects.vector2 import Vector2
from random import randint #, choice

SCREEN_SIZE=(800, 600)

MAIN_DIR=os.path.split(os.path.abspath(__file__))[0]

image_background = "image/back.png"
image_sunflower = "image/sunflower.png"
image_beanshooter = "image/bean_shooter.png"
image_bean_bullet = "image/bean_bullet.png"
image_zombie_dancer = "image/zombie_buckethead.png"

MAP_ARRAY_COL=20
MAP_ARRAY_ROW=20
ARRAY_COL_SIZE=100
ARRAY_ROW_SIZE=100
 
def load_image(file, width=None, number=None):
	''' load image list from image list file '''
	
	surface = pygame.image.load(file).convert_alpha()
	
	if width == None:
		return surface
		
	height = surface.get_height()
 
	return [
		surface.subsurface(
			Rect((i * width, 0), (width, height))
		) for i in xrange(number)
	]

class World(object):
	''' world '''
	def __init__(self):
		self.entities = {}
		self.entity_id = 0
		self.map_status = [
				[0 for x in range(MAP_ARRAY_COL)] 
				for y in range(MAP_ARRAY_ROW)
		]
		self.background = pygame.image.load(os.path.join(MAIN_DIR, image_background)).convert()
		self.select_entity = None
 
	def add_entity(self, entity):
		self.entities[self.entity_id] = entity
		entity.id = self.entity_id
		self.entity_id += 1
 
	def remove_entity(self, entity):
		del self.entities[entity.id]
 
	def get(self, entity_id):
		if entity_id in self.entities:
			return self.entities[entity_id]
		else:
			return None
 
	def process(self, time_passed):
		''' '''
		time_passed_seconds = time_passed
		for entity in self.entities.values():
			entity.process(time_passed_seconds)
 
	def render(self, surface):
		''''''
		# render background
		surface.blit(self.background, (0, 0) )
		# render entities
		for entity in self.entities.itervalues():
			entity.render(surface)
		if self.select_entity != None:
			self.select_entity.render(surface)
		
	def get_near_entity(self, location, range=100.):
		''' get near entity which distan less than range'''
		location = Vector2(*location)
		for entity in self.entities.itervalues():
#			if entity.name == name:
			distance = location.get_distance_to(entity.location)
			if distance < range:
				return entity
				
		return None
		
	def get_map_status_ab(self, position_xy):
		x, y= position_xy
		
		if x % ARRAY_COL_SIZE > ARRAY_COL_SIZE/2:
			a = x/ ARRAY_COL_SIZE + 1
		else :
			a = x/ARRAY_COL_SIZE
			
		if y % ARRAY_ROW_SIZE > ARRAY_ROW_SIZE/2:
			b = y/ARRAY_ROW_SIZE + 1
		else :
			b = y/ARRAY_ROW_SIZE
			
		return (a, b)

		
	def get_map_status_xy(self, position_ab):
		a, b = position_ab
		
		return (a*ARRAY_COL_SIZE, b*ARRAY_ROW_SIZE)
		
class GameZone():
	def __init__(self, world):
		pass
	
class ToolBoxZone():
	''' '''
	_locate = (0,10)
	_tool_num = 10
	def __init__(self, world):
		self.world = world
		self.tool_count = 0
		self.tools = {}
		self.location = self._locate
		self.image = pygame.load_image().convert()
		pass
		
	def render(self, surface):
		''''''
		surface.blit(self.image, self.location)
		for tool in self.tools.itervalues():
			tool.render(surface)

	def add_tool_item(self, tool_item):
		''''''
		self.tools[tool_item.name] = tool_item
		self.tool_count+=1
		
	def del_tool_item(self, tool_item):
		''''''
		del self.tools[tool_item.name]
		
class ToolItem():
	''''''
	_image_rect = (64, 64)
	def __init__(self, tool_box_zone, name, image_file, id):
		self.tool_box_zone = tool_box_zone
		self.name = name
		self.image = pygame.image.load(image_file).convert()
		self.id = id
		
	def render(self, surface):
		surface.blit(self.image, self.location)
	
class Entity(pygame.sprite.Sprite):
	''' game entity '''
	images = []
	
	def __init__(self, world, name):
		self.world = world
		self.name = name
		self.id = world.entity_id
		self.image = None
		self.location = Vector2(0, 0)
		self.destination = Vector2(0, 0)
		self.speed = 0.
	#	self.brain = StateMachine()
		
	def think(self):
		pass
		
	def walk(self, time_passed):
		if self.speed > 0. and self.location != self.destination:
			vec_to_destination = self.destination - self.location
			distance_to_destination = vec_to_destination.get_length()
			heading = vec_to_destination.get_normalized()
			travel_distance = min(distance_to_destination, int(time_passed/ 1000.0 * self.speed))
			self.location += travel_distance * heading
		
	def update(self, time_passed):
		''''''
		pass
	
	def process(self, time_passed):
		''' process  '''
		self.think()
		self.update(time_passed)
		if self.speed > 0. :
			self.walk(time_passed)
		
	def locate(self):
		''' locate entity in a world postion  '''

		''' check  '''
		entity = self.world.get_near_entity(self.location)
		if entity != None:
			return False

		''' '''
		self.location = Vector2(self.world.get_map_status_xy(self.world.get_map_status_ab(self.location)))
		return True
		

	def render(self, surface):
		x, y = self.location
		w, h = self.image.get_size()
		surface.blit(self.image, (x-w/2, y-h/2))   

class Bullet(Entity):
	'''Bullet'''
	_rate = 80
	_width = 82
	_height = 77
	_image_num = 1
	_life = 100
	_speed = 62
	images = []
	''' game entity '''
	def __init__(self, world, name, image_file_name):
		Entity.__init__(self, world, name)
		self.order = 0
		pygame.sprite.Sprite.__init__(self)
		self.image = pygame.image.load(os.path.join(MAIN_DIR,  image_file_name)).convert_alpha()
		self.rect = Rect(0, 0, self._width, self._height)
		self.life = self._life
		self.passed_time = 0
		self.speed = self._speed
		
class BeanBullet(Bullet):
	def __init__(self, world):
		Bullet.__init__(self, world, "BeanBullet", image_bean_bullet)
		
class Zombie(Entity):
	'''Zombie'''
	_rate = 80
	_width = 67
	_height = 116
	_image_num = 1
	_life = 100
	_speed = 57
	images = []
	
	def __init__(self, world, name, image_file_name):
		Entity.__init__(self, world, name)
		self.order = 0
		pygame.sprite.Sprite.__init__(self)
		if len(self.images) == 0:
			self.images = load_image(os.path.join(MAIN_DIR,  image_file_name), self._width, self._image_num)
		self.image = self.images[self.order]
		self.image = pygame.image.load(os.path.join(MAIN_DIR,  image_file_name)).convert_alpha()
		self.rect = Rect(0, 0, self._width, self._height)
		self.life = self._life
		self.passed_time = 0
		self.speed = self._speed
		
	
	def process(self, time_passed):
	#	self.brain.think()
		self.passed_time += time_passed 
		self.order = int(( self.passed_time / self._rate ) % self._image_num )
		if self.order == 0 and self.passed_time > self._rate:
			self.passed_time = 0
		self.image = self.images[self.order]
		
		Entity.process(self, time_passed)
		
class DancerZombie(Zombie):
	def __init__(self, world):
		Zombie.__init__(self, world, "DancerZombie", image_zombie_dancer)
		

class Plant(Entity):
	''' SunFlower '''
	_rate = 10
	_width = 70
	_height = 70
	_image_num = 1
	_life = 100
	images = []
	
	def __init__(self, world, name, image_file):
		pygame.sprite.Sprite.__init__(self)
		Entity.__init__(self, world, name)
		self.order = 0
		
		if len(self.images) == 0:
			self.images = load_image(os.path.join(MAIN_DIR,  image_file), self._width, self._image_num)
		self.image = self.images[self.order]
		self.rect = Rect(0, 0, self._width, self._height)
		self.life = self._life
		self.passed_time = 0
		
	def process(self, passed_time):
		self.passed_time += passed_time
		self.order = int(( self.passed_time / self._rate ) % self._image_num)
		if self.order == 0 and self.passed_time > self._rate:
			self.passed_time = 0
		self.image = self.images[self.order]
		Entity.process(self, passed_time)
		
class BeanShooter(Plant):
	''' BeanShooter '''

	_rate = 80
	_width = 70
	_height = 70
	_image_num = 1
	_life = 100
	images = []
	
	def __init__(self, world):
		self.update_shoot = False
		self.shoot_time = 0.
		Plant.__init__(self, world, "BeanShooter" , image_beanshooter)
 
	def process(self, passed_time):
		if self.update_shoot == True:
			self.shoot(passed_time)
		Plant.process(self, passed_time)
		
	def shoot(self, passed_time):
		self.shoot_time += passed_time
		if self.shoot_time > 3000 :
			self.shoot_time = 0
			bean_bullet = BeanBullet(self.world)
			bean_bullet.location = Vector2(self.location[0]+30, self.location[1]-20)
			bean_bullet.destination = Vector2(SCREEN_SIZE[0], self.location[1])
			self.world.add_entity(bean_bullet)
		
class SunFlower(Plant):
	''' SunFlower '''
	_rate = 80
	_width = 82
	_height = 77
	_image_num = 18
	_life = 100
	images = []
	
	def __init__(self, world):
		Plant.__init__(self, world, "SunFlower", image_sunflower)
		
def run():
	''' run '''
	
	pygame.init()
	screen = pygame.display.set_mode(SCREEN_SIZE, 0, 32)
	
	world = World()
	clock = pygame.time.Clock()
	
	w, h = SCREEN_SIZE
	
	while True:	
		for event in pygame.event.get():
			if event.type == QUIT:
				exit()

			elif event.type == MOUSEBUTTONDOWN:
				world.select_entity = BeanShooter(world)
				
				
				world.select_entity.location = Vector2(event.pos)
				
			elif event.type == MOUSEMOTION:
				if world.select_entity != None:
					world.select_entity.location = Vector2(event.pos)
					
			elif event.type == MOUSEBUTTONUP:
				if world.select_entity != None:
					if world.select_entity.name == "BeanShooter":
						world.select_entity.locate()
						world.select_entity.update_shoot = True
							
				world.add_entity(world.select_entity)				
				world.select_entity = None	
		
		time_passed = clock.tick(30)
		
		if randint(1, 100) == 1:
			dancerZombie = DancerZombie(world)
			locate_h = randint(0, h)
			dancerZombie.location = Vector2(w, locate_h)
			dancerZombie.locate()
			dancerZombie.destination = Vector2(0, dancerZombie.location[1])
			world.add_entity(dancerZombie)
		
		#process
		world.process(time_passed)
		
		#render
		world.render(screen)
		
		pygame.display.update()
	
if __name__ == "__main__":
	run()
