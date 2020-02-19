from vpython import * 

scene = canvas(width = 900, height= 600, center = vec(0,0,0))
aObjects = []
sun = sphere(pos = vector(0,0,0), radius = 15, mass = 333000 ,color = color.orange)
mercury = sphere(pos = vector(57,0,0), radius = 10 , mass = 0.0553, color = color.blue, velocity = vector(0,0.1223476, 0.84),  make_trail= True, trail_type="points", retain=50)
venus = sphere(pos = vector(108,0,0), radius = 10, mass = 0.815, color = color.blue, velocity = vector(0,0.05916666, 2.5),  make_trail= True,trail_type="points", retain=50)
earth = sphere(pos = vector(149,0,0), radius = 10, mass = 1, texture = textures.earth, velocity = vector(0,0, 2.5),  make_trail= True,trail_type="points", retain=50)
mars = sphere(pos = vector(160,0,0), radius = 10, mass = 0.107, color = color.red, velocity = vector(0,0.03228859, 0.9),  make_trail= True, trail_type="points", retain=50)
jupiter = sphere(pos = vector(780,0,0), radius = 10, mass = 317.8, color = color.red, velocity = vector(0,0.02286381, 19.1),  make_trail= True,trail_type="points", retain=50)
saturn = sphere(pos = vector(1437,0,0), radius = 10, mass = 95.2, color = color.red, velocity = vector(0,0.32, 6.97),  make_trail= True,trail_type="points", retain=50)
uranus = sphere(pos = vector(2871,0,0), radius = 10, mass = 14.5, color = color.red, velocity = vector(0,0.228, 2.68),  make_trail= True,trail_type="points", retain=50)
neptune = sphere(pos = vector(4530,0,0), radius = 10, mass = 17.1, color = color.red, velocity = vector(0,0.182, 2.54),  make_trail= True,trail_type="points", retain=50)
Kohoutek= sphere(pos = vector(149 *3.4,0,0), radius = 10, mass = 15, texture = textures.rough, velocity = vector(0,0, 4.24),  make_trail= True,trail_type="points", retain=50)
Wild = sphere(pos = vector(149 *3.44,0,0), radius = 10, mass = 15, texture = textures.rough, velocity = vector(0,0, 4.24),  make_trail= True,trail_type="points", retain=50)
TempelTuttle	= sphere(pos = vector(149 *10.33,0,0), radius = 10, mass = 15, texture = textures.rough, velocity = vector(0,0, 1.24),  make_trail= True,trail_type="points", retain=50)
Chiron= sphere(pos = vector(149 *13.7,0,0), radius = 10, mass = 15, texture = textures.rough, velocity = vector(0,0, 0.74),  make_trail= True,trail_type="points", retain=50)
halley= sphere(pos = vector(149 *17.94,0,0), radius = 10, mass = 15, texture = textures.rough, velocity = vector(0,0, 0.54),  make_trail= True,trail_type="points",retain=50)
HaleBopp	= sphere(pos = vector(149 *250,0,0), radius = 10, mass = 750, texture = textures.rough, velocity = vector(0,0, 0.74),  make_trail= True,trail_type="points",retain=50)


aObjects.extend((mercury, venus, earth, mars,jupiter, saturn, uranus, neptune,halley,TempelTuttle,Kohoutek,Wild,Chiron,HaleBopp))

#earthv = vector(0,0, 6.6616)
G = 6.67e-3
playing = True

while playing:

    rate(50)

    for aObject in aObjects:
        aObject.pos += aObject.velocity
        dist = ( aObject.pos.x**2 + aObject.pos.y**2 + aObject.pos.z**2) **0.5
        radialVector = (aObject.pos - sun.pos) / dist
        fGrav = -G * aObject.mass * sun.mass * radialVector/dist**2
        aObject.velocity += fGrav
        aObject.pos += aObject.velocity
        #Code to follow specific astronomic objects
        scene.center = HaleBopp.pos
        if dist <= sun.radius : playing = False
