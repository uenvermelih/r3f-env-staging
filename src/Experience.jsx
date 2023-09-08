import { useFrame } from '@react-three/fiber'
import { OrbitControls, useHelper, BakeShadows, SoftShadows, AccumulativeShadows, RandomizedLight, ContactShadows, Sky, Environment, Lightformer } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from "three"
import { useControls } from "leva"
import { PlaneGeometry } from 'three'

export default function Experience()
{

    const {color, opacity, blur} = useControls("contact shadows", {

        color: "#000000",
        opacity: { value: 0.5, min: 0, max: 1 },
        blur: { value: 1, min: 0, max: 10 }
    })

    const { sunPosition } = useControls("sky", {
        sunPosition:{ value: [1, 2, 3]}
    })

    const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls("env", {
        envMapIntensity: { value: 1, min: 0, max: 12 },
        envMapHeight: { value: 7, min: 0, max: 100 },
        envMapRadius: { value: 20, min: 0, max: 1000 },
        envMapScale: { value: 100, min: 0, max: 1000 }
    }) 

    const { envLightIntensity } = useControls("env", {
        envLightIntensity: { value: 5, min: 0, max: 20 }
    }) 

    

    const directionalLightRef = useRef()
    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1)

    const cubeRef = useRef()
    
    useFrame((state, delta) =>
    {
        cubeRef.current.rotation.y += delta * 0.2
        // const time = state.clock.elapsedTime
        // cubeRef.current.position.x = 2 + Math.sin(time)
    })

    return <>

        <Environment 
            // files={ [
            //     "./environmentMaps/2/px.jpg",
            //     "./environmentMaps/2/nx.jpg",
            //     "./environmentMaps/2/py.jpg",
            //     "./environmentMaps/2/ny.jpg",
            //     "./environmentMaps/2/pz.jpg",
            //     "./environmentMaps/2/nz.jpg",
            // ]}

            // files={"./environmentMaps/the_sky_is_on_fire_2k.hdr"}

            preset='sunset'
            ground={{
                height: envMapHeight, 
                radius: envMapRadius,
                scale: envMapScale
            }}
        >   
            {/* <Lightformer 
                position-z={ -5 }
                scale={ 3 }
                color="red"
                intensity={ envLightIntensity }
                form="ring"
            /> */}
            {/* <mesh position-z={ -5 } scale={ 10 }>
                <planeGeometry />
                <meshBasicMaterial color={[ 1, 0, 0 ]}/>
            </mesh> */}


        </Environment>

        {/* <BakeShadows />
        <SoftShadows frustum={ 3.75 } size={ 50 } near={ 9.5 } samples={ 17 } rings={ 11 }/> */}

        <color args={[ "ivory" ]} attach="background"/>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* <AccumulativeShadows
        position={ [0, -0.99, 0] }
        scale={ 10 }
        color="#316d39"
        frames={ Infinity }
        temporal
        blend={ 100 }
        >
        <RandomizedLight
        amount={ 8 }
        radius={ 1 }
        ambient={ 0.5 }
        intensity={ 1 }
        position={ [1, 2, 3] }
        bias={ 0.001 }
        />
    </AccumulativeShadows> */}
        
        <ContactShadows 
            position={[ 0, 0, 0 ]}
            // position={[ 0, -0.99, 0 ]} // removed floor mesh, put objects on environment floor
            scale={ 10 }
            resolution= { 512 }
            far={ 5 }
            color={ color }
            opacity={ opacity }
            blur={ blur }
            // frames={ 1 } if static
        />

        {/* <Sky sunPosition={sunPosition}/> */}

        {/* <directionalLight 
        ref={ directionalLightRef } 
        position={ sunPosition } 
        intensity={ 1.5 } 
        castShadow
        shadow-mapSize={ [1024, 1024] }
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={4}
        shadow-camera-right={4}
        shadow-camera-bottom={-4}
        shadow-camera-left={-4}

        />

        <ambientLight intensity={ 0.5 } /> */}

        <mesh castShadow position-x={ - 2 } position-y={ 1 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity}/>
        </mesh>

        <mesh ref={ cubeRef } castShadow position-x={ 2 } position-y={ 1 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity}/>
        </mesh>

        {/* <mesh receiveShadow position-y={ -1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntensity}/>
        </mesh> */}

    </>
}