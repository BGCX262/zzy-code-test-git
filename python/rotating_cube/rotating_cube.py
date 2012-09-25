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

def angle_reg(angle):
	if(angle < 0):
		return angle+360
	elif (angle >=360):
		return angle-360
	else:
		return angle

class Cube:
	"""
	cube unit block
	"""

	vert_index = [
			(-1, 1, -1), (1,1,-1),(1,-1,-1),(-1,-1,-1),
			(-1, 1, 1), (1,1,1),(1,-1,1),(-1,-1,1)
			]

		# indices to the vertices list defined above.
	face_vert = [
			(1,5,6,2),(4,0,3,7),(0,4,5,1),
			(3,2,6,7),(0,1,2,3),(5,4,7,6)
			]

	# Define colors for each face
	face_colors = [
			COL_RED, COL_GREEN, COL_BLUE,
			COL_YELLOW, COL_PINK, COL_UNKNOW
			]

	def __init__(self,point,size=0.5):
		self.point = point
		self.angle = [0,0,0]
		self.vertices = []

		for vert in Cube.vert_index:
			self.vertices.append(Point3D(point.x+vert[0]*size, 
				point.y+vert[1]*size, 
				point.z+vert[2]*size ))

		self.face_color = zip(Cube.face_vert, Cube.face_colors)

	def rotate(self, angle):
		self.angle = [ x+y for x,y in zip(self.angle, angle)]

	def getCurPoint(self):
		return self.point.rotateX(self.angle[0]).rotateY(self.angle[1]).rotateZ(self.angle[2])

	def update(self, mc):
		t = []
		draw_list = mc.game.draw_list

		for v in self.vertices:
			r = v.rotateX(self.angle[0]).rotateY(self.angle[1]).rotateZ(self.angle[2])
			# Transform the point from 3D to 2D
			p = r.project(640, 480, 400, 8)
			# Put the point in the list of transformed vertices
			t.append(p)

		for fc in self.face_color:
			f = fc[0]
			c = fc[1]
			f_points = [ t[f[0]], t[f[1]], t[f[2]], t[f[3]] ]
			face = Face(f_points, c)
			draw_list.append(face)
		

class MagicCube:
	""""""
	def_pos = (0,0,0)

	def __init__(self, game, pos=def_pos):
		self.pos = pos 
		self.game = game
		self.cube_list = []

		for x in range(-1, 2):
			for y in range(-1, 2):
				for z in range(-1,2):
					cube = Cube(Point3D(self.pos[0]+x,
						self.pos[1]+y, 
						self.pos[2]+z))
					self.cube_list.append(cube)
#		for pos in MagicCube.cube_pos:
#			cube = Cube(Point3D(pos[0],pos[1],pos[2]))

	def RotateCubes(self, which, direct):
		cube_list = []
		for cube in self.cube_list:
			point = cube.getCurPoint()
			if(which == "L1" and int(point.y) == -1):
				cube_list.append(cube)
			elif(which == "L2" and int(point.y) == 0):
				cube_list.append(cube)
			elif(which == "L3" and int(point.y) == 1):
				cube_list.append(cube)
			elif(which == "R1" and int(point.x) == -1):
				cube_list.append(cube)
			elif(which == "R2" and int(point.x) == 0):
				cube_list.append(cube)
			elif(which == "R3" and int(point.x) == 1):
				cube_list.append(cube)
			elif(which == "F1" and int(point.z) == -1):
				cube_list.append(cube)
			elif(which == "F2" and int(point.z) == 0):
				cube_list.append(cube)
			elif(which == "F3" and int(point.z) == 1):
				cube_list.append(cube)

		angle = 0
		while angle < 90:
			for cube in cube_list:
				if direct == "LEFT":
					cube.rotate((0,2,0))
				elif direct == "RIGHT":
					cube.rotate((0,-2,0))
				elif direct == "UP":
					cube.rotate((2,0,0))
				elif direct == "DOWN":
					cube.rotate((-2,0,0))
				elif direct == "FRONT":
					cube.rotate((0,0,-2))
				elif direct == "BACK":
					cube.rotate((0,0,2))
			angle += 2

	def update(self):
		"""

		"""
		#self.draw_list = []
		for cube in self.cube_list:
			cube.update(self)

class Game:
	"' '"
	def __init__(self, win_width = 640, win_height = 480):
		pygame.init()
		pygame.display.set_caption("Magic Cube")
		self.screen = pygame.display.set_mode((win_width, win_height))
		self.draw_list = []
		self.clock = pygame.time.Clock()
		self.items = []	
		self.items.append(MagicCube(self))
#		self.items.append(MagicCube(self, (-1,0,0)))

	def update(self):
		"""

		"""
		self.draw_list = []
		self.screen.fill((0,0,0))

		for item in self.items:
			item.update()

		avg_z = []
		i = 0
		for f in self.draw_list:
			avg_z.append([i,f.avg_z()])
			i = i + 1

		for tmp in sorted(avg_z,key=itemgetter(1),reverse=True):
			self.draw_list[tmp[0]].display(self)

		self.clock.tick(10)
		pygame.display.flip()
	
	def run(self):
		"""
		"""
		while 1:

			self.update()

			for event in pygame.event.get():
				if event.type == pygame.QUIT:
					pygame.quit()
					sys.exit()

			pressed_keys = pygame.key.get_pressed()

			if  pressed_keys[K_LEFT]:
				self.items[0].RotateCubes("L1", "LEFT")
			elif  pressed_keys[K_RIGHT]:
				self.items[0].RotateCubes("L1", "RIGHT")
			elif  pressed_keys[K_UP]:
				self.items[0].RotateCubes("R1", "UP")
			elif  pressed_keys[K_DOWN]:
				self.items[0].RotateCubes("R2", "DOWN")
			elif  pressed_keys[K_a]:
				self.items[0].RotateCubes("F1", "FRONT")
			elif  pressed_keys[K_d]:
				self.items[0].RotateCubes("F2", "BACK")


if __name__ == "__main__":
	Game().run()

