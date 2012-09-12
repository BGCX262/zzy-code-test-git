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

class Cube:
	"' cube unit '"
	def __init__(self,point,size=0.5):
		self.point = point
		self.vertices = [
				Point3D(point.x-size, point.y+size, point.z-size ),
				Point3D(point.x+size, point.y+size, point.z-size ),
				Point3D(point.x+size, point.y-size, point.z-size ),
				Point3D(point.x-size, point.y-size, point.z-size ),
				Point3D(point.x-size, point.y+size, point.z+size ),
				Point3D(point.x+size, point.y+size, point.z+size ),
				Point3D(point.x+size, point.y-size, point.z+size ),
				Point3D(point.x-size, point.y-size, point.z+size )
				]

#		self.vertices = points

		# Define the vertices that compose each of the 6 faces. These numbers are
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

		self.angle_x = 0
		self.angle_y = 0
		self.angle_z = 0

		if self.point.x > 0:
			self.faces.append((1,5,6,2))   #right
			self.colors.append(COL_RED)
#			self.faces.append((4,0,3,7))   #left
#			self.colors.append(COL_BLACK)
		elif self.point.x < 0:
			self.faces.append((4,0,3,7))   #left
			self.colors.append(COL_GREEN)
#			self.faces.append((1,5,6,2))
#			self.colors.append(COL_BLACK)
#		else: 
#			self.faces.append((1,5,6,2))
#			self.colors.append(COL_BLACK)
#			self.faces.append((4,0,3,7))   #left
#			self.colors.append(COL_BLACK)

		if self.point.y > 0:
			self.faces.append((0,4,5,1))   #top
			self.colors.append(COL_BLUE)
#			self.faces.append((3,2,6,7))   #bottom
#			self.colors.append(COL_BLACK)
		elif self.point.y < 0:
			self.faces.append((3,2,6,7))   #bottom
			self.colors.append(COL_YELLOW)
#			self.faces.append((0,4,5,1))   #top
#			self.colors.append(COL_BLACK)
#		else:
#			self.faces.append((3,2,6,7))   #bottom
#			self.colors.append(COL_BLACK)
#			self.faces.append((0,4,5,1))   #top
#			self.colors.append(COL_BLACK)

		
		if self.point.z < 0:
			self.faces.append((0,1,2,3))   #front
			self.colors.append(COL_PINK)
#			self.faces.append((5,4,7,6))   #bottom
#			self.colors.append(COL_BLACK)
		elif self.point.z > 0:
			self.faces.append((5,4,7,6))   #bottom
			self.colors.append(COL_UNKNOW)
#			self.faces.append((0,1,2,3))   #front
#			self.colors.append(COL_BLACK)
#		else:
#			self.faces.append((0,1,2,3))   #front
#			self.colors.append(COL_BLACK)
#			self.faces.append((5,4,7,6))   #bottom
#			self.colors.append(COL_BLACK)


	def rotateX(self, x):
		self.angle_x += x

	def rotateY(self, y):
		self.angle_y += y

	def rotateZ(self, z):
		self.angle_z += z

	def update(self, screen):
		# It will hold transformed vertices.
		t = []

		for v in self.vertices:
			# Rotate the point around X axis, then around Y axis, and finally around Z axis.
			r = v.rotateX(self.angle_x).rotateY(self.angle_y).rotateZ(self.angle_z)
			# Transform the point from 3D to 2D
			p = r.project(640, 480, 400, 6)
			# Put the point in the list of transformed vertices
			t.append(p)

		# Calculate the average Z values of each face.
		avg_z = []
		i = 0
		faces = []
		for f in self.faces:
			faces.append(f)
		
		for f in faces:
			z = (t[f[0]].z + t[f[1]].z + t[f[2]].z + t[f[3]].z) / 4.0
			avg_z.append([i,z])
			i = i + 1

		# Draw the faces using the Painter's algorithm:
		# Distant faces are drawn before the closer ones.
		for tmp in sorted(avg_z,key=itemgetter(1),reverse=True):
			face_index = tmp[0]
			f = faces[face_index]
			pointlist = [(t[f[0]].x, t[f[0]].y), (t[f[1]].x, t[f[1]].y),
					(t[f[1]].x, t[f[1]].y), (t[f[2]].x, t[f[2]].y),
					(t[f[2]].x, t[f[2]].y), (t[f[3]].x, t[f[3]].y),
					(t[f[3]].x, t[f[3]].y), (t[f[0]].x, t[f[0]].y)]
			pygame.draw.polygon(screen,self.colors[face_index],pointlist)
			pygame.draw.lines(screen,(0,0,0), True, pointlist, 1)


class Game:
	"' '"
	def __init__(self, win_width = 640, win_height = 480):
		pygame.init()
		self.screen = pygame.display.set_mode((win_width, win_height))
		pygame.display.set_caption("Simulation of a rotating 3D Cube (http://codeNtronix.com)")
		self.clock = pygame.time.Clock()

	def run(self):
		cube_list = []
		cube_pos = [
				(1,0,0),(-1,0,0),(0,1,0),(0,-1,0),(0,0,1),(0,0,-1),  #center_cube
				(0,1,1),(0,1,-1),(0,-1,-1),(0,-1,1),
				(1,0,1),(-1,0,1),(-1,0,-1),(1,0,-1),
				(1,1,0),(1,-1,0),(-1,1,0),(-1,-1,0),
				(1,1,1),(1,1,-1),(1,-1,1),(-1,1,1),(-1,-1,1),(-1,1,-1),(1,-1,-1),(-1,-1,-1)
				]

		for pos in cube_pos:
			cube = Cube(Point3D(pos[0],pos[1],pos[2]))
			cube_list.append(cube)

		while 1:
			for event in pygame.event.get():
				if event.type == pygame.QUIT:
					pygame.quit()
					sys.exit()

			pressed_keys = pygame.key.get_pressed()

			self.screen.fill((0,0,0))

			draw_cube_list=[]

			for cube in cube_list:
				if  pressed_keys[K_LEFT]:
					cube.rotateY(1)
				elif  pressed_keys[K_RIGHT]:
					cube.rotateY(-1)
				elif  pressed_keys[K_UP]:
					cube.rotateX(1)
				elif  pressed_keys[K_DOWN]:
					cube.rotateX(-1)
				elif  pressed_keys[K_a]:
					cube.rotateZ(1)
				elif  pressed_keys[K_d]:
					cube.rotateZ(-1)
				
				cube.update(self.screen)

			self.clock.tick(50)

			pygame.display.flip()

if __name__ == "__main__":
	Game().run()
