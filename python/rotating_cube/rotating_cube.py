"""
 Simulation of a rotating 3D Cube
 Developed by Leonel Machava <leonelmachava@gmail.com>

 http://codeNtronix.com
"""
import sys, math, pygame
from pygame.locals import *
from operator import itemgetter

COL_RED=(255,0,0)
COL_GREEN=(0,255,0)
COL_BLUE=(0,0,255)
COL_YELLOW=(255,255,0)
COL_PINK=(255,0,255)
COL_UNKNOW=(0,255,255)
COL_BLACK=(0,0,0)


class Point3D:
	def __init__(self, x = 0, y = 0, z = 0):
		self.x, self.y, self.z = float(x), float(y), float(z)

	def rotateX(self, angle):
		""" Rotates the point around the X axis by the given angle in degrees. """
		rad = angle * math.pi / 180
		cosa = math.cos(rad)
		sina = math.sin(rad)
		y = self.y * cosa - self.z * sina
		z = self.y * sina + self.z * cosa
		return Point3D(self.x, y, z)

	def rotateY(self, angle):
		""" Rotates the point around the Y axis by the given angle in degrees. """
		rad = angle * math.pi / 180
		cosa = math.cos(rad)
		sina = math.sin(rad)
		z = self.z * cosa - self.x * sina
		x = self.z * sina + self.x * cosa
		return Point3D(x, self.y, z)

	def rotateZ(self, angle):
		""" Rotates the point around the Z axis by the given angle in degrees. """
		rad = angle * math.pi / 180
		cosa = math.cos(rad)
		sina = math.sin(rad)
		x = self.x * cosa - self.y * sina
		y = self.x * sina + self.y * cosa
		return Point3D(x, y, self.z)

	def project(self, win_width, win_height, fov, viewer_distance):
		""" Transforms this 3D point to 2D using a perspective projection. """
		factor = fov / (viewer_distance + self.z)
		x = self.x * factor + win_width / 2
		y = -self.y * factor + win_height / 2
		return Point3D(x, y, self.z)

class Face:
	def __init__(self, points, color):
		self.points = points
		self.color = color

	def avg_z(self):
		return ( self.points[0].z + 
				self.points[1].z + 
				self.points[2].z + 
				self.points[3].z
				) / 4.0

	def display(self, game):
		pointlist = [(self.points[0].x, self.points[0].y), 
					(self.points[1].x, self.points[1].y),
					(self.points[2].x, self.points[2].y),
					(self.points[3].x, self.points[3].y),
					(self.points[0].x, self.points[0].y)]
		pygame.draw.polygon(game.screen, self.color,pointlist)
		pygame.draw.lines(game.screen, COL_BLACK, True, pointlist, 1)

class Cube:
	"' cube unit '"
	def __init__(self,point,size=0.5):
		self.point = point
		self.angle_x = 0
		self.angle_y = 0
		self.angle_z = 0
		self.vertices = [
				Point3D(point.x-size, point.y+size, point.z-size ), #0
				Point3D(point.x+size, point.y+size, point.z-size ), #1
				Point3D(point.x+size, point.y-size, point.z-size ), #2
				Point3D(point.x-size, point.y-size, point.z-size ), #3
				Point3D(point.x-size, point.y+size, point.z+size ), #4
				Point3D(point.x+size, point.y+size, point.z+size ), #5
				Point3D(point.x+size, point.y-size, point.z+size ), #6
				Point3D(point.x-size, point.y-size, point.z+size )  #7
				]

		# indices to the vertices list defined above.
		self.faces  = []
	#			(0,1,2,3), #front  -z
	#			(1,5,6,2), #right  +x
	#			(5,4,7,6), #behind +z
	#			(4,0,3,7), #left   -x
	#			(0,4,5,1), #top    +y
	#			(3,2,6,7)  #bottom -y
				
		# Define colors for each face
		self.colors = []

		if self.point.x > 0:
			self.faces.append((1,5,6,2))   #right
			self.colors.append(COL_RED)
		elif self.point.x < 0:
			self.faces.append((4,0,3,7))   #left
			self.colors.append(COL_GREEN)

		if self.point.y > 0:
			self.faces.append((0,4,5,1))   #top
			self.colors.append(COL_BLUE)
		elif self.point.y < 0:
			self.faces.append((3,2,6,7))   #bottom
			self.colors.append(COL_YELLOW)
		
		if self.point.z < 0:
			self.faces.append((0,1,2,3))   #front
			self.colors.append(COL_PINK)
		elif self.point.z > 0:
			self.faces.append((5,4,7,6))   #bottom
			self.colors.append(COL_UNKNOW)

	def rotateX(self, x):
		"' make angle_x add x  '"
		self.angle_x += x

	def rotateY(self, y):
		self.angle_y += y

	def rotateZ(self, z):
		self.angle_z += z

	def update(self, game):
		t = []

		for v in self.vertices:
			r = v.rotateX(self.angle_x).rotateY(self.angle_y).rotateZ(self.angle_z)
			# Transform the point from 3D to 2D
			p = r.project(640, 480, 400, 6)
			# Put the point in the list of transformed vertices
			t.append(p)

		for f in self.faces:
			f_points = [ t[f[0]], t[f[1]], t[f[2]], t[f[3]] ]
			color = self.colors[self.faces.index(f)]
			face = Face(f_points, color)
			game.draw_list.append(face)
		

class Game:
	"' '"
	def __init__(self, win_width = 640, win_height = 480):
		pygame.init()
		self.screen = pygame.display.set_mode((win_width, win_height))
		pygame.display.set_caption("Simulation of a rotating 3D Cube (http://codeNtronix.com)")
		self.clock = pygame.time.Clock()
		self.draw_list = []
		self.cube_list = []
		self.cube_pos = [
				(-1,-1,-1),(0,-1,-1),(1,-1,-1), #0,1,2 
				(-1,-1, 0),(0,-1, 0),(1,-1, 0), #3,4,5
				(-1,-1, 1),(0,-1, 1),(1,-1, 1),	#6,7,8
				(-1, 0,-1),(0, 0,-1),(1, 0,-1),	#9,10,11
				(-1, 0, 0),(0, 0, 0),(1, 0, 0),	#12,13,14
				(-1, 0, 1),(0, 0, 1),(1, 0, 1), #15,16,17
				(-1, 1,-1),(0, 1,-1),(1, 1,-1), #18,19,20
				(-1, 1, 0),(0, 1, 0),(1, 1, 0), #21,22,23
				(-1, 1, 1),(0, 1, 1),(1, 1, 1)  #24,25,26
				]

		self.cubes = [
				[	(0,1,2,3,4,5,6,7,8), 		#range(0,9),
					(9,10,11,12,13,14,15,16,17),#range(9,18),
					(18,19,20,21,22,23,24,25,26)
				],
				[	(0,3,6,9,12,15,18,21,24),  #[x*3 for x in range(0,9)],
					(1,4,7,10,13,16,19,22,25), #[x*3+1 for x in range(0,9)],
					(2,5,8,11,14,17,20,23,26)  #[x*3+2 for x in range(0,9)]
				],
				[	(0,1,2,9,10,11,18,19,20),
					(3,4,5,12,13,14,21,22,23),
					(6,7,8,15,16,17,24,25,26)
				]
			]

		for pos in self.cube_pos:
			cube = Cube(Point3D(pos[0],pos[1],pos[2]))
			self.cube_list.append(cube)

	def RotateCubes(self, which, direct):
		print "--------------------------------"
		cube_list = []
		for cube in self.cube_list:
			point = cube.point.rotateX(cube.angle_x).rotateY(cube.angle_y).rotateZ(cube.angle_z)
			if(which == "L1" and int(point.y) == -1):
				cube_list.append(cube)
				print "point x,y,z : %d %d %d"% (int(point.x), int(point.y), int(point.z))
			elif(which == "L2" and int(point.y) == 0):
				cube_list.append(cube)
				print "point x,y,z : %d %d %d"% (int(point.x), int(point.y), int(point.z))
			elif(which == "L3" and int(point.y) == 1):
				cube_list.append(cube)
				print "point x,y,z : %d %d %d"% (int(point.x), int(point.y), int(point.z))
			elif(which == "R1" and int(point.x) == -1):
				cube_list.append(cube)
				print "point x,y,z : %d %d %d"% (int(point.x), int(point.y), int(point.z))
			elif(which == "R2" and int(point.x) == 0):
				cube_list.append(cube)
				print "point x,y,z : %d %d %d"% (int(point.x), int(point.y), int(point.z))
			elif(which == "R3" and int(point.x) == 1):
				cube_list.append(cube)
				print "point x,y,z : %d %d %d"% (int(point.x), int(point.y), int(point.z))
			elif(which == "F1" and int(point.z) == -1):
				cube_list.append(cube)
				print "point x,y,z : %d %d %d"% (int(point.x), int(point.y), int(point.z))
			elif(which == "F2" and int(point.z) == 0):
				cube_list.append(cube)
				print "point x,y,z : %d %d %d"% (int(point.x), int(point.y), int(point.z))
			elif(which == "F3" and int(point.z) == 1):
				cube_list.append(cube)
				print "point x,y,z : %d %d %d"% (int(point.x), int(point.y), int(point.z))
			
		angle = 0
		while angle < 90:
			#print "cube count: %d" % len(cube_list)
			for cube in cube_list:
				#print "%d  %d  %d" %(cube.point.x,cube.point.y,cube.point.z)
				#cube = self.cube_list[cube_index]
				if direct == "LEFT":
					cube.rotateY(1)
				elif direct == "RIGHT":
					cube.rotateY(-1)
				elif direct == "UP":
					cube.rotateX(1)
				elif direct == "DOWN":
					cube.rotateX(-1)
				elif direct == "FRONT":
					cube.rotateZ(1)
				elif direct == "BACK":
					cube.rotateZ(-1)

			angle +=1
			self.refresh()
			self.clock.tick(1000)

	def refresh(self):
		"''"
		self.draw_list = []
		for cube in self.cube_list:
			cube.update(self)
		
		avg_z = []
		i = 0
		for f in self.draw_list:
			avg_z.append([i,f.avg_z()])
			i = i + 1

		self.screen.fill((0,0,0))
		for tmp in sorted(avg_z,key=itemgetter(1),reverse=True):
			self.draw_list[tmp[0]].display(self)

		pygame.display.flip()

	def run(self):

		self.refresh()
		
		while 1:
			
			for event in pygame.event.get():
				if event.type == pygame.QUIT:
					pygame.quit()
					sys.exit()

			pressed_keys = pygame.key.get_pressed()

			if  pressed_keys[K_LEFT]:
				self.RotateCubes("L1", "LEFT")
			elif  pressed_keys[K_RIGHT]:
				self.RotateCubes("L1", "RIGHT")
			elif  pressed_keys[K_UP]:
				self.RotateCubes("R1", "UP")
			elif  pressed_keys[K_DOWN]:
				self.RotateCubes("R2", "DOWN")
			elif  pressed_keys[K_a]:
				self.RotateCubes("F1", "FRONT")
			elif  pressed_keys[K_d]:
				self.RotateCubes("F2", "BACK")


if __name__ == "__main__":
	Game().run()

