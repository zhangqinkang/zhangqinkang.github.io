var zr=Object.defineProperty;var kr=(e,n,t)=>n in e?zr(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var be=(e,n,t)=>kr(e,typeof n!="symbol"?n+"":n,t);import{_ as Wr}from"./2swrLqXG.js";import{N as Xr}from"./BFYMXu7m.js";import{c as Yr,N as Rt,S as qr,V as ft,C as $e,F as dr,M as kt,a as We,R as Kr,w as fn,W as Wt,b as nt,L as $t,H as gn,U as Nt,D as xt,B as _t,d as Jt,t as $r,e as Zr,f as En,p as Qr,g as Jr,E as jr,h as dt,P as Qt,A as ea,i as An,j as Tt,k as hn,l as Kn,m as jt,n as en,o as ur,q as ta,r as Ht,s as mn,u as na,v as ia,x as Kt,O as ra,y as aa,z as oa,G as sa,I as ca,J as la,K as fa,Q as da,T as ua,X as pa,Y as ha,Z as ma,_ as _a,$ as va,a0 as ga,a1 as Ea,a2 as Sa,a3 as Ma,a4 as Rn,a5 as Gt,a6 as an,a7 as xa,a8 as zt,a9 as Ta,aa as Aa,ab as Ra,ac as Ca,ad as pr,ae as ba,af as Pa,ag as La,ah as Ua,ai as Be,aj as wa,ak as Da,al as Ia,am as Ct,an as hr,ao as dn,ap as At,aq as mr,ar as yt,as as Mt,at as _n,au as _r,av as vr,aw as gr,ax as $n,ay as ya,az as Na,aA as Fa,aB as Er,aC as It,aD as Oa,aE as Ba,aF as Ha,aG as Sr,aH as Ga,aI as Mr,aJ as xr,aK as Cn,aL as bn,aM as Pn,aN as Ln,aO as qe,aP as ai,aQ as oi,aR as si,aS as ci,aT as li,aU as fi,aV as di,aW as ui,aX as pi,aY as hi,aZ as mi,a_ as _i,a$ as vi,b0 as gi,b1 as Ei,b2 as Si,b3 as Mi,b4 as xi,b5 as Ti,b6 as Ai,b7 as Ri,b8 as Un,b9 as Ci,ba as bi,bb as Va,bc as Pi,bd as Li,be as Ui,bf as On,bg as Bn,bh as Hn,bi as Gn,bj as Vn,bk as zn,bl as kn,bm as za,bn as wi,bo as ka,bp as un,bq as Wa,br as Di,bs as Ii,bt as yi,bu as Wn,bv as Xn,bw as Xa,bx as Tr,by as Ya,bz as Sn,bA as qa,bB as Ka,bC as Ar,bD as Rr,bE as Ni,bF as Cr,bG as Fi,bH as br,bI as tn,bJ as Xt,bK as $a,bL as Za,bM as Qa,bN as Ja,bO as ja,bP as Oi,bQ as lt,bR as eo,bS as to,bT as no,bU as io,bV as ro,bW as ao,bX as oo,bY as so,bZ as co,b_ as lo,b$ as fo,c0 as uo,c1 as po,c2 as ho,c3 as mo,c4 as _o,c5 as vo,c6 as go,c7 as Eo}from"./CUymhuQ-.js";import{f as Zn,h as Pr,i as Lr,j as So,o as vn,a as Yn,r as Ur,d as on,w as Bi,b as Ot,e as Hi,F as Gi,t as Mo,s as xo,_ as To,u as Ao,k as Ro}from"./Dld_Q6gh.js";import"./UbdYwpcr.js";import"./D1EI67Kd.js";import"./C--ZbWEy.js";import"./CBwvSypK.js";import"./BGFfJ1Rw.js";import"./B2XSB641.js";/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function wr(){let e=null,n=!1,t=null,i=null;function l(s,h){t(s,h),i=e.requestAnimationFrame(l)}return{start:function(){n!==!0&&t!==null&&(i=e.requestAnimationFrame(l),n=!0)},stop:function(){e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(s){t=s},setContext:function(s){e=s}}}function Co(e){const n=new WeakMap;function t(d,b){const S=d.array,w=d.usage,x=S.byteLength,M=e.createBuffer();e.bindBuffer(b,M),e.bufferData(b,S,w),d.onUploadCallback();let R;if(S instanceof Float32Array)R=e.FLOAT;else if(S instanceof Uint16Array)d.isFloat16BufferAttribute?R=e.HALF_FLOAT:R=e.UNSIGNED_SHORT;else if(S instanceof Int16Array)R=e.SHORT;else if(S instanceof Uint32Array)R=e.UNSIGNED_INT;else if(S instanceof Int32Array)R=e.INT;else if(S instanceof Int8Array)R=e.BYTE;else if(S instanceof Uint8Array)R=e.UNSIGNED_BYTE;else if(S instanceof Uint8ClampedArray)R=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+S);return{buffer:M,type:R,bytesPerElement:S.BYTES_PER_ELEMENT,version:d.version,size:x}}function i(d,b,S){const w=b.array,x=b.updateRanges;if(e.bindBuffer(S,d),x.length===0)e.bufferSubData(S,0,w);else{x.sort((R,N)=>R.start-N.start);let M=0;for(let R=1;R<x.length;R++){const N=x[M],P=x[R];P.start<=N.start+N.count+1?N.count=Math.max(N.count,P.start+P.count-N.start):(++M,x[M]=P)}x.length=M+1;for(let R=0,N=x.length;R<N;R++){const P=x[R];e.bufferSubData(S,P.start*w.BYTES_PER_ELEMENT,w,P.start,P.count)}b.clearUpdateRanges()}b.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),n.get(d)}function s(d){d.isInterleavedBufferAttribute&&(d=d.data);const b=n.get(d);b&&(e.deleteBuffer(b.buffer),n.delete(d))}function h(d,b){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const w=n.get(d);(!w||w.version<d.version)&&n.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const S=n.get(d);if(S===void 0)n.set(d,t(d,b));else if(S.version<d.version){if(S.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(S.buffer,d,b),S.version=d.version}}return{get:l,remove:s,update:h}}var bo=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Po=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Lo=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Uo=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wo=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Do=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Io=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,yo=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,No=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Fo=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Oo=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bo=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ho=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Go=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Vo=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,zo=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ko=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wo=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xo=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yo=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,qo=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ko=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,$o=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Zo=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Qo=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Jo=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,jo=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,es=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ts=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ns=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,is="gl_FragColor = linearToOutputTexel( gl_FragColor );",rs=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,as=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,os=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ss=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,cs=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ls=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fs=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ds=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,us=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ps=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hs=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ms=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_s=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vs=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gs=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Es=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ss=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ms=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xs=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ts=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,As=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Rs=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Cs=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,bs=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ps=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ls=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Us=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ws=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ds=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Is=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ys=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ns=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Fs=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Os=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Bs=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hs=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gs=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vs=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zs=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ks=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ws=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Xs=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ys=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qs=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ks=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$s=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Zs=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qs=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Js=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,js=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ec=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,tc=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,nc=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ic=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rc=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ac=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,oc=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sc=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cc=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,lc=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,fc=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,dc=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,uc=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pc=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,hc=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mc=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,_c=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vc=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gc=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ec=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Sc=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Mc=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,xc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ac=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Rc=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Cc=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bc=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lc=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wc=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dc=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ic=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,yc=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Nc=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Fc=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Oc=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bc=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Hc=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gc=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Vc=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zc=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kc=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wc=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Xc=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yc=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,qc=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Kc=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$c=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zc=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Qc=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jc=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jc=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,el=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,tl=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,nl=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,il=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,rl=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,al=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ue={alphahash_fragment:bo,alphahash_pars_fragment:Po,alphamap_fragment:Lo,alphamap_pars_fragment:Uo,alphatest_fragment:wo,alphatest_pars_fragment:Do,aomap_fragment:Io,aomap_pars_fragment:yo,batching_pars_vertex:No,batching_vertex:Fo,begin_vertex:Oo,beginnormal_vertex:Bo,bsdfs:Ho,iridescence_fragment:Go,bumpmap_pars_fragment:Vo,clipping_planes_fragment:zo,clipping_planes_pars_fragment:ko,clipping_planes_pars_vertex:Wo,clipping_planes_vertex:Xo,color_fragment:Yo,color_pars_fragment:qo,color_pars_vertex:Ko,color_vertex:$o,common:Zo,cube_uv_reflection_fragment:Qo,defaultnormal_vertex:Jo,displacementmap_pars_vertex:jo,displacementmap_vertex:es,emissivemap_fragment:ts,emissivemap_pars_fragment:ns,colorspace_fragment:is,colorspace_pars_fragment:rs,envmap_fragment:as,envmap_common_pars_fragment:os,envmap_pars_fragment:ss,envmap_pars_vertex:cs,envmap_physical_pars_fragment:Es,envmap_vertex:ls,fog_vertex:fs,fog_pars_vertex:ds,fog_fragment:us,fog_pars_fragment:ps,gradientmap_pars_fragment:hs,lightmap_pars_fragment:ms,lights_lambert_fragment:_s,lights_lambert_pars_fragment:vs,lights_pars_begin:gs,lights_toon_fragment:Ss,lights_toon_pars_fragment:Ms,lights_phong_fragment:xs,lights_phong_pars_fragment:Ts,lights_physical_fragment:As,lights_physical_pars_fragment:Rs,lights_fragment_begin:Cs,lights_fragment_maps:bs,lights_fragment_end:Ps,logdepthbuf_fragment:Ls,logdepthbuf_pars_fragment:Us,logdepthbuf_pars_vertex:ws,logdepthbuf_vertex:Ds,map_fragment:Is,map_pars_fragment:ys,map_particle_fragment:Ns,map_particle_pars_fragment:Fs,metalnessmap_fragment:Os,metalnessmap_pars_fragment:Bs,morphinstance_vertex:Hs,morphcolor_vertex:Gs,morphnormal_vertex:Vs,morphtarget_pars_vertex:zs,morphtarget_vertex:ks,normal_fragment_begin:Ws,normal_fragment_maps:Xs,normal_pars_fragment:Ys,normal_pars_vertex:qs,normal_vertex:Ks,normalmap_pars_fragment:$s,clearcoat_normal_fragment_begin:Zs,clearcoat_normal_fragment_maps:Qs,clearcoat_pars_fragment:Js,iridescence_pars_fragment:js,opaque_fragment:ec,packing:tc,premultiplied_alpha_fragment:nc,project_vertex:ic,dithering_fragment:rc,dithering_pars_fragment:ac,roughnessmap_fragment:oc,roughnessmap_pars_fragment:sc,shadowmap_pars_fragment:cc,shadowmap_pars_vertex:lc,shadowmap_vertex:fc,shadowmask_pars_fragment:dc,skinbase_vertex:uc,skinning_pars_vertex:pc,skinning_vertex:hc,skinnormal_vertex:mc,specularmap_fragment:_c,specularmap_pars_fragment:vc,tonemapping_fragment:gc,tonemapping_pars_fragment:Ec,transmission_fragment:Sc,transmission_pars_fragment:Mc,uv_pars_fragment:xc,uv_pars_vertex:Tc,uv_vertex:Ac,worldpos_vertex:Rc,background_vert:Cc,background_frag:bc,backgroundCube_vert:Pc,backgroundCube_frag:Lc,cube_vert:Uc,cube_frag:wc,depth_vert:Dc,depth_frag:Ic,distanceRGBA_vert:yc,distanceRGBA_frag:Nc,equirect_vert:Fc,equirect_frag:Oc,linedashed_vert:Bc,linedashed_frag:Hc,meshbasic_vert:Gc,meshbasic_frag:Vc,meshlambert_vert:zc,meshlambert_frag:kc,meshmatcap_vert:Wc,meshmatcap_frag:Xc,meshnormal_vert:Yc,meshnormal_frag:qc,meshphong_vert:Kc,meshphong_frag:$c,meshphysical_vert:Zc,meshphysical_frag:Qc,meshtoon_vert:Jc,meshtoon_frag:jc,points_vert:el,points_frag:tl,shadow_vert:nl,shadow_frag:il,sprite_vert:rl,sprite_frag:al},ee={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},Et={basic:{uniforms:lt([ee.common,ee.specularmap,ee.envmap,ee.aomap,ee.lightmap,ee.fog]),vertexShader:Ue.meshbasic_vert,fragmentShader:Ue.meshbasic_frag},lambert:{uniforms:lt([ee.common,ee.specularmap,ee.envmap,ee.aomap,ee.lightmap,ee.emissivemap,ee.bumpmap,ee.normalmap,ee.displacementmap,ee.fog,ee.lights,{emissive:{value:new $e(0)}}]),vertexShader:Ue.meshlambert_vert,fragmentShader:Ue.meshlambert_frag},phong:{uniforms:lt([ee.common,ee.specularmap,ee.envmap,ee.aomap,ee.lightmap,ee.emissivemap,ee.bumpmap,ee.normalmap,ee.displacementmap,ee.fog,ee.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30}}]),vertexShader:Ue.meshphong_vert,fragmentShader:Ue.meshphong_frag},standard:{uniforms:lt([ee.common,ee.envmap,ee.aomap,ee.lightmap,ee.emissivemap,ee.bumpmap,ee.normalmap,ee.displacementmap,ee.roughnessmap,ee.metalnessmap,ee.fog,ee.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag},toon:{uniforms:lt([ee.common,ee.aomap,ee.lightmap,ee.emissivemap,ee.bumpmap,ee.normalmap,ee.displacementmap,ee.gradientmap,ee.fog,ee.lights,{emissive:{value:new $e(0)}}]),vertexShader:Ue.meshtoon_vert,fragmentShader:Ue.meshtoon_frag},matcap:{uniforms:lt([ee.common,ee.bumpmap,ee.normalmap,ee.displacementmap,ee.fog,{matcap:{value:null}}]),vertexShader:Ue.meshmatcap_vert,fragmentShader:Ue.meshmatcap_frag},points:{uniforms:lt([ee.points,ee.fog]),vertexShader:Ue.points_vert,fragmentShader:Ue.points_frag},dashed:{uniforms:lt([ee.common,ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ue.linedashed_vert,fragmentShader:Ue.linedashed_frag},depth:{uniforms:lt([ee.common,ee.displacementmap]),vertexShader:Ue.depth_vert,fragmentShader:Ue.depth_frag},normal:{uniforms:lt([ee.common,ee.bumpmap,ee.normalmap,ee.displacementmap,{opacity:{value:1}}]),vertexShader:Ue.meshnormal_vert,fragmentShader:Ue.meshnormal_frag},sprite:{uniforms:lt([ee.sprite,ee.fog]),vertexShader:Ue.sprite_vert,fragmentShader:Ue.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ue.background_vert,fragmentShader:Ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:Ue.backgroundCube_vert,fragmentShader:Ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ue.cube_vert,fragmentShader:Ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ue.equirect_vert,fragmentShader:Ue.equirect_frag},distanceRGBA:{uniforms:lt([ee.common,ee.displacementmap,{referencePosition:{value:new We},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ue.distanceRGBA_vert,fragmentShader:Ue.distanceRGBA_frag},shadow:{uniforms:lt([ee.lights,ee.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:Ue.shadow_vert,fragmentShader:Ue.shadow_frag}};Et.physical={uniforms:lt([Et.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag};const sn={r:0,b:0,g:0},Lt=new Cr,ol=new kt;function sl(e,n,t,i,l,s,h){const d=new $e(0);let b=s===!0?0:1,S,w,x=null,M=0,R=null;function N(v){let m=v.isScene===!0?v.background:null;return m&&m.isTexture&&(m=(v.backgroundBlurriness>0?t:n).get(m)),m}function P(v){let m=!1;const O=N(v);O===null?r(d,b):O&&O.isColor&&(r(O,1),m=!0);const L=e.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,h):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,h),(e.autoClear||m)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function o(v,m){const O=N(m);O&&(O.isCubeTexture||O.mapping===Sn)?(w===void 0&&(w=new At(new Rr(1,1,1),new Ct({name:"BackgroundCubeMaterial",uniforms:Ni(Et.backgroundCube.uniforms),vertexShader:Et.backgroundCube.vertexShader,fragmentShader:Et.backgroundCube.fragmentShader,side:_t,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),w.geometry.deleteAttribute("normal"),w.geometry.deleteAttribute("uv"),w.onBeforeRender=function(L,D,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(w.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(w)),Lt.copy(m.backgroundRotation),Lt.x*=-1,Lt.y*=-1,Lt.z*=-1,O.isCubeTexture&&O.isRenderTargetTexture===!1&&(Lt.y*=-1,Lt.z*=-1),w.material.uniforms.envMap.value=O,w.material.uniforms.flipEnvMap.value=O.isCubeTexture&&O.isRenderTargetTexture===!1?-1:1,w.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,w.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,w.material.uniforms.backgroundRotation.value.setFromMatrix4(ol.makeRotationFromEuler(Lt)),w.material.toneMapped=nt.getTransfer(O.colorSpace)!==qe,(x!==O||M!==O.version||R!==e.toneMapping)&&(w.material.needsUpdate=!0,x=O,M=O.version,R=e.toneMapping),w.layers.enableAll(),v.unshift(w,w.geometry,w.material,0,0,null)):O&&O.isTexture&&(S===void 0&&(S=new At(new $n(2,2),new Ct({name:"BackgroundMaterial",uniforms:Ni(Et.background.uniforms),vertexShader:Et.background.vertexShader,fragmentShader:Et.background.fragmentShader,side:Jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),S.geometry.deleteAttribute("normal"),Object.defineProperty(S.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(S)),S.material.uniforms.t2D.value=O,S.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,S.material.toneMapped=nt.getTransfer(O.colorSpace)!==qe,O.matrixAutoUpdate===!0&&O.updateMatrix(),S.material.uniforms.uvTransform.value.copy(O.matrix),(x!==O||M!==O.version||R!==e.toneMapping)&&(S.material.needsUpdate=!0,x=O,M=O.version,R=e.toneMapping),S.layers.enableAll(),v.unshift(S,S.geometry,S.material,0,0,null))}function r(v,m){v.getRGB(sn,Ar(e)),i.buffers.color.setClear(sn.r,sn.g,sn.b,m,h)}function g(){w!==void 0&&(w.geometry.dispose(),w.material.dispose(),w=void 0),S!==void 0&&(S.geometry.dispose(),S.material.dispose(),S=void 0)}return{getClearColor:function(){return d},setClearColor:function(v,m=1){d.set(v),b=m,r(d,b)},getClearAlpha:function(){return b},setClearAlpha:function(v){b=v,r(d,b)},render:P,addToRenderList:o,dispose:g}}function cl(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},l=M(null);let s=l,h=!1;function d(f,C,Y,H,q){let Q=!1;const W=x(H,Y,C);s!==W&&(s=W,S(s.object)),Q=R(f,H,Y,q),Q&&N(f,H,Y,q),q!==null&&n.update(q,e.ELEMENT_ARRAY_BUFFER),(Q||h)&&(h=!1,m(f,C,Y,H),q!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(q).buffer))}function b(){return e.createVertexArray()}function S(f){return e.bindVertexArray(f)}function w(f){return e.deleteVertexArray(f)}function x(f,C,Y){const H=Y.wireframe===!0;let q=i[f.id];q===void 0&&(q={},i[f.id]=q);let Q=q[C.id];Q===void 0&&(Q={},q[C.id]=Q);let W=Q[H];return W===void 0&&(W=M(b()),Q[H]=W),W}function M(f){const C=[],Y=[],H=[];for(let q=0;q<t;q++)C[q]=0,Y[q]=0,H[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:Y,attributeDivisors:H,object:f,attributes:{},index:null}}function R(f,C,Y,H){const q=s.attributes,Q=C.attributes;let W=0;const j=Y.getAttributes();for(const G in j)if(j[G].location>=0){const Se=q[G];let we=Q[G];if(we===void 0&&(G==="instanceMatrix"&&f.instanceMatrix&&(we=f.instanceMatrix),G==="instanceColor"&&f.instanceColor&&(we=f.instanceColor)),Se===void 0||Se.attribute!==we||we&&Se.data!==we.data)return!0;W++}return s.attributesNum!==W||s.index!==H}function N(f,C,Y,H){const q={},Q=C.attributes;let W=0;const j=Y.getAttributes();for(const G in j)if(j[G].location>=0){let Se=Q[G];Se===void 0&&(G==="instanceMatrix"&&f.instanceMatrix&&(Se=f.instanceMatrix),G==="instanceColor"&&f.instanceColor&&(Se=f.instanceColor));const we={};we.attribute=Se,Se&&Se.data&&(we.data=Se.data),q[G]=we,W++}s.attributes=q,s.attributesNum=W,s.index=H}function P(){const f=s.newAttributes;for(let C=0,Y=f.length;C<Y;C++)f[C]=0}function o(f){r(f,0)}function r(f,C){const Y=s.newAttributes,H=s.enabledAttributes,q=s.attributeDivisors;Y[f]=1,H[f]===0&&(e.enableVertexAttribArray(f),H[f]=1),q[f]!==C&&(e.vertexAttribDivisor(f,C),q[f]=C)}function g(){const f=s.newAttributes,C=s.enabledAttributes;for(let Y=0,H=C.length;Y<H;Y++)C[Y]!==f[Y]&&(e.disableVertexAttribArray(Y),C[Y]=0)}function v(f,C,Y,H,q,Q,W){W===!0?e.vertexAttribIPointer(f,C,Y,q,Q):e.vertexAttribPointer(f,C,Y,H,q,Q)}function m(f,C,Y,H){P();const q=H.attributes,Q=Y.getAttributes(),W=C.defaultAttributeValues;for(const j in Q){const G=Q[j];if(G.location>=0){let he=q[j];if(he===void 0&&(j==="instanceMatrix"&&f.instanceMatrix&&(he=f.instanceMatrix),j==="instanceColor"&&f.instanceColor&&(he=f.instanceColor)),he!==void 0){const Se=he.normalized,we=he.itemSize,Ge=n.get(he);if(Ge===void 0)continue;const Qe=Ge.buffer,k=Ge.type,J=Ge.bytesPerElement,de=k===e.INT||k===e.UNSIGNED_INT||he.gpuType===Er;if(he.isInterleavedBufferAttribute){const ne=he.data,ge=ne.stride,He=he.offset;if(ne.isInstancedInterleavedBuffer){for(let Te=0;Te<G.locationSize;Te++)r(G.location+Te,ne.meshPerAttribute);f.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Te=0;Te<G.locationSize;Te++)o(G.location+Te);e.bindBuffer(e.ARRAY_BUFFER,Qe);for(let Te=0;Te<G.locationSize;Te++)v(G.location+Te,we/G.locationSize,k,Se,ge*J,(He+we/G.locationSize*Te)*J,de)}else{if(he.isInstancedBufferAttribute){for(let ne=0;ne<G.locationSize;ne++)r(G.location+ne,he.meshPerAttribute);f.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let ne=0;ne<G.locationSize;ne++)o(G.location+ne);e.bindBuffer(e.ARRAY_BUFFER,Qe);for(let ne=0;ne<G.locationSize;ne++)v(G.location+ne,we/G.locationSize,k,Se,we*J,we/G.locationSize*ne*J,de)}}else if(W!==void 0){const Se=W[j];if(Se!==void 0)switch(Se.length){case 2:e.vertexAttrib2fv(G.location,Se);break;case 3:e.vertexAttrib3fv(G.location,Se);break;case 4:e.vertexAttrib4fv(G.location,Se);break;default:e.vertexAttrib1fv(G.location,Se)}}}}g()}function O(){B();for(const f in i){const C=i[f];for(const Y in C){const H=C[Y];for(const q in H)w(H[q].object),delete H[q];delete C[Y]}delete i[f]}}function L(f){if(i[f.id]===void 0)return;const C=i[f.id];for(const Y in C){const H=C[Y];for(const q in H)w(H[q].object),delete H[q];delete C[Y]}delete i[f.id]}function D(f){for(const C in i){const Y=i[C];if(Y[f.id]===void 0)continue;const H=Y[f.id];for(const q in H)w(H[q].object),delete H[q];delete Y[f.id]}}function B(){p(),h=!0,s!==l&&(s=l,S(s.object))}function p(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:B,resetDefaultState:p,dispose:O,releaseStatesOfGeometry:L,releaseStatesOfProgram:D,initAttributes:P,enableAttribute:o,disableUnusedAttributes:g}}function ll(e,n,t){let i;function l(S){i=S}function s(S,w){e.drawArrays(i,S,w),t.update(w,i,1)}function h(S,w,x){x!==0&&(e.drawArraysInstanced(i,S,w,x),t.update(w,i,x))}function d(S,w,x){if(x===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,S,0,w,0,x);let R=0;for(let N=0;N<x;N++)R+=w[N];t.update(R,i,1)}function b(S,w,x,M){if(x===0)return;const R=n.get("WEBGL_multi_draw");if(R===null)for(let N=0;N<S.length;N++)h(S[N],w[N],M[N]);else{R.multiDrawArraysInstancedWEBGL(i,S,0,w,0,M,0,x);let N=0;for(let P=0;P<x;P++)N+=w[P]*M[P];t.update(N,i,1)}}this.setMode=l,this.render=s,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=b}function fl(e,n,t,i){let l;function s(){if(l!==void 0)return l;if(n.has("EXT_texture_filter_anisotropic")===!0){const D=n.get("EXT_texture_filter_anisotropic");l=e.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(D){return!(D!==Tt&&i.convert(D)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(D){const B=D===gn&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(D!==Nt&&i.convert(D)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==It&&!B)}function b(D){if(D==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let S=t.precision!==void 0?t.precision:"highp";const w=b(S);w!==S&&(console.warn("THREE.WebGLRenderer:",S,"not supported, using",w,"instead."),S=w);const x=t.logarithmicDepthBuffer===!0,M=t.reverseDepthBuffer===!0&&n.has("EXT_clip_control"),R=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),N=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),P=e.getParameter(e.MAX_TEXTURE_SIZE),o=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),r=e.getParameter(e.MAX_VERTEX_ATTRIBS),g=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),v=e.getParameter(e.MAX_VARYING_VECTORS),m=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),O=N>0,L=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:b,textureFormatReadable:h,textureTypeReadable:d,precision:S,logarithmicDepthBuffer:x,reverseDepthBuffer:M,maxTextures:R,maxVertexTextures:N,maxTextureSize:P,maxCubemapSize:o,maxAttributes:r,maxVertexUniforms:g,maxVaryings:v,maxFragmentUniforms:m,vertexTextures:O,maxSamples:L}}function dl(e){const n=this;let t=null,i=0,l=!1,s=!1;const h=new Ua,d=new Be,b={value:null,needsUpdate:!1};this.uniform=b,this.numPlanes=0,this.numIntersection=0,this.init=function(x,M){const R=x.length!==0||M||i!==0||l;return l=M,i=x.length,R},this.beginShadows=function(){s=!0,w(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(x,M){t=w(x,M,0)},this.setState=function(x,M,R){const N=x.clippingPlanes,P=x.clipIntersection,o=x.clipShadows,r=e.get(x);if(!l||N===null||N.length===0||s&&!o)s?w(null):S();else{const g=s?0:i,v=g*4;let m=r.clippingState||null;b.value=m,m=w(N,M,v,R);for(let O=0;O!==v;++O)m[O]=t[O];r.clippingState=m,this.numIntersection=P?this.numPlanes:0,this.numPlanes+=g}};function S(){b.value!==t&&(b.value=t,b.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function w(x,M,R,N){const P=x!==null?x.length:0;let o=null;if(P!==0){if(o=b.value,N!==!0||o===null){const r=R+P*4,g=M.matrixWorldInverse;d.getNormalMatrix(g),(o===null||o.length<r)&&(o=new Float32Array(r));for(let v=0,m=R;v!==P;++v,m+=4)h.copy(x[v]).applyMatrix4(g,d),h.normal.toArray(o,m),o[m+3]=h.constant}b.value=o,b.needsUpdate=!0}return n.numPlanes=P,n.numIntersection=0,o}}function ul(e){let n=new WeakMap;function t(h,d){return d===Wn?h.mapping=tn:d===Xn&&(h.mapping=Xt),h}function i(h){if(h&&h.isTexture){const d=h.mapping;if(d===Wn||d===Xn)if(n.has(h)){const b=n.get(h).texture;return t(b,h.mapping)}else{const b=h.image;if(b&&b.height>0){const S=new Xa(b.height);return S.fromEquirectangularTexture(e,h),n.set(h,S),h.addEventListener("dispose",l),t(S.texture,h.mapping)}else return null}}return h}function l(h){const d=h.target;d.removeEventListener("dispose",l);const b=n.get(d);b!==void 0&&(n.delete(d),b.dispose())}function s(){n=new WeakMap}return{get:i,dispose:s}}const Vt=4,Vi=[.125,.215,.35,.446,.526,.582],Dt=20,wn=new $a,zi=new $e;let Dn=null,In=0,yn=0,Nn=!1;const wt=(1+Math.sqrt(5))/2,Bt=1/wt,ki=[new We(-wt,Bt,0),new We(wt,Bt,0),new We(-Bt,0,wt),new We(Bt,0,wt),new We(0,wt,-Bt),new We(0,wt,Bt),new We(-1,1,-1),new We(1,1,-1),new We(-1,1,1),new We(1,1,1)],pl=new We;class Wi{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(n,t=0,i=.1,l=100,s={}){const{size:h=256,position:d=pl}=s;Dn=this._renderer.getRenderTarget(),In=this._renderer.getActiveCubeFace(),yn=this._renderer.getActiveMipmapLevel(),Nn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const b=this._allocateTargets();return b.depthBuffer=!0,this._sceneToCubeUV(n,i,l,b,d),t>0&&this._blur(b,0,0,t),this._applyPMREM(b),this._cleanup(b),b}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qi(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yi(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodPlanes.length;n++)this._lodPlanes[n].dispose()}_cleanup(n){this._renderer.setRenderTarget(Dn,In,yn),this._renderer.xr.enabled=Nn,n.scissorTest=!1,cn(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===tn||n.mapping===Xt?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),Dn=this._renderer.getRenderTarget(),In=this._renderer.getActiveCubeFace(),yn=this._renderer.getActiveMipmapLevel(),Nn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Gt,minFilter:Gt,generateMipmaps:!1,type:gn,format:Tt,colorSpace:En,depthBuffer:!1},l=Xi(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xi(n,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=hl(s)),this._blurMaterial=ml(s,n,t)}return l}_compileMaterial(n){const t=new At(this._lodPlanes[0],n);this._renderer.compile(t,wn)}_sceneToCubeUV(n,t,i,l,s){const b=new Qt(90,1,t,i),S=[1,-1,1,1,1,1],w=[1,1,1,-1,-1,-1],x=this._renderer,M=x.autoClear,R=x.toneMapping;x.getClearColor(zi),x.toneMapping=Rt,x.autoClear=!1;const N=new Za({name:"PMREM.Background",side:_t,depthWrite:!1,depthTest:!1}),P=new At(new Rr,N);let o=!1;const r=n.background;r?r.isColor&&(N.color.copy(r),n.background=null,o=!0):(N.color.copy(zi),o=!0);for(let g=0;g<6;g++){const v=g%3;v===0?(b.up.set(0,S[g],0),b.position.set(s.x,s.y,s.z),b.lookAt(s.x+w[g],s.y,s.z)):v===1?(b.up.set(0,0,S[g]),b.position.set(s.x,s.y,s.z),b.lookAt(s.x,s.y+w[g],s.z)):(b.up.set(0,S[g],0),b.position.set(s.x,s.y,s.z),b.lookAt(s.x,s.y,s.z+w[g]));const m=this._cubeSize;cn(l,v*m,g>2?m:0,m,m),x.setRenderTarget(l),o&&x.render(P,b),x.render(n,b)}P.geometry.dispose(),P.material.dispose(),x.toneMapping=R,x.autoClear=M,n.background=r}_textureToCubeUV(n,t){const i=this._renderer,l=n.mapping===tn||n.mapping===Xt;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=qi()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yi());const s=l?this._cubemapMaterial:this._equirectMaterial,h=new At(this._lodPlanes[0],s),d=s.uniforms;d.envMap.value=n;const b=this._cubeSize;cn(t,0,0,3*b,2*b),i.setRenderTarget(t),i.render(h,wn)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const l=this._lodPlanes.length;for(let s=1;s<l;s++){const h=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),d=ki[(l-s-1)%ki.length];this._blur(n,s-1,s,h,d)}t.autoClear=i}_blur(n,t,i,l,s){const h=this._pingPongRenderTarget;this._halfBlur(n,h,t,i,l,"latitudinal",s),this._halfBlur(h,n,i,i,l,"longitudinal",s)}_halfBlur(n,t,i,l,s,h,d){const b=this._renderer,S=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const w=3,x=new At(this._lodPlanes[l],S),M=S.uniforms,R=this._sizeLods[i]-1,N=isFinite(s)?Math.PI/(2*R):2*Math.PI/(2*Dt-1),P=s/N,o=isFinite(s)?1+Math.floor(w*P):Dt;o>Dt&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${o} samples when the maximum is set to ${Dt}`);const r=[];let g=0;for(let D=0;D<Dt;++D){const B=D/P,p=Math.exp(-B*B/2);r.push(p),D===0?g+=p:D<o&&(g+=2*p)}for(let D=0;D<r.length;D++)r[D]=r[D]/g;M.envMap.value=n.texture,M.samples.value=o,M.weights.value=r,M.latitudinal.value=h==="latitudinal",d&&(M.poleAxis.value=d);const{_lodMax:v}=this;M.dTheta.value=N,M.mipInt.value=v-i;const m=this._sizeLods[l],O=3*m*(l>v-Vt?l-v+Vt:0),L=4*(this._cubeSize-m);cn(t,O,L,3*m,2*m),b.setRenderTarget(t),b.render(x,wn)}}function hl(e){const n=[],t=[],i=[];let l=e;const s=e-Vt+1+Vi.length;for(let h=0;h<s;h++){const d=Math.pow(2,l);t.push(d);let b=1/d;h>e-Vt?b=Vi[h-e+Vt-1]:h===0&&(b=0),i.push(b);const S=1/(d-2),w=-S,x=1+S,M=[w,w,x,w,x,x,w,w,x,x,w,x],R=6,N=6,P=3,o=2,r=1,g=new Float32Array(P*N*R),v=new Float32Array(o*N*R),m=new Float32Array(r*N*R);for(let L=0;L<R;L++){const D=L%3*2/3-1,B=L>2?0:-1,p=[D,B,0,D+2/3,B,0,D+2/3,B+1,0,D,B,0,D+2/3,B+1,0,D,B+1,0];g.set(p,P*N*L),v.set(M,o*N*L);const f=[L,L,L,L,L,L];m.set(f,r*N*L)}const O=new hr;O.setAttribute("position",new dn(g,P)),O.setAttribute("uv",new dn(v,o)),O.setAttribute("faceIndex",new dn(m,r)),n.push(O),l>Vt&&l--}return{lodPlanes:n,sizeLods:t,sigmas:i}}function Xi(e,n,t){const i=new Wt(e,n,t);return i.texture.mapping=Sn,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function cn(e,n,t,i,l){e.viewport.set(n,t,i,l),e.scissor.set(n,t,i,l)}function ml(e,n,t){const i=new Float32Array(Dt),l=new We(0,1,0);return new Ct({name:"SphericalGaussianBlur",defines:{n:Dt,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Qn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:yt,depthTest:!1,depthWrite:!1})}function Yi(){return new Ct({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:yt,depthTest:!1,depthWrite:!1})}function qi(){return new Ct({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yt,depthTest:!1,depthWrite:!1})}function Qn(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function _l(e){let n=new WeakMap,t=null;function i(d){if(d&&d.isTexture){const b=d.mapping,S=b===Wn||b===Xn,w=b===tn||b===Xt;if(S||w){let x=n.get(d);const M=x!==void 0?x.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==M)return t===null&&(t=new Wi(e)),x=S?t.fromEquirectangular(d,x):t.fromCubemap(d,x),x.texture.pmremVersion=d.pmremVersion,n.set(d,x),x.texture;if(x!==void 0)return x.texture;{const R=d.image;return S&&R&&R.height>0||w&&R&&l(R)?(t===null&&(t=new Wi(e)),x=S?t.fromEquirectangular(d):t.fromCubemap(d),x.texture.pmremVersion=d.pmremVersion,n.set(d,x),d.addEventListener("dispose",s),x.texture):null}}}return d}function l(d){let b=0;const S=6;for(let w=0;w<S;w++)d[w]!==void 0&&b++;return b===S}function s(d){const b=d.target;b.removeEventListener("dispose",s);const S=n.get(b);S!==void 0&&(n.delete(b),S.dispose())}function h(){n=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:h}}function vl(e){const n={};function t(i){if(n[i]!==void 0)return n[i];let l;switch(i){case"WEBGL_depth_texture":l=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=e.getExtension(i)}return n[i]=l,l}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const l=t(i);return l===null&&fn("THREE.WebGLRenderer: "+i+" extension not supported."),l}}}function gl(e,n,t,i){const l={},s=new WeakMap;function h(x){const M=x.target;M.index!==null&&n.remove(M.index);for(const N in M.attributes)n.remove(M.attributes[N]);M.removeEventListener("dispose",h),delete l[M.id];const R=s.get(M);R&&(n.remove(R),s.delete(M)),i.releaseStatesOfGeometry(M),M.isInstancedBufferGeometry===!0&&delete M._maxInstanceCount,t.memory.geometries--}function d(x,M){return l[M.id]===!0||(M.addEventListener("dispose",h),l[M.id]=!0,t.memory.geometries++),M}function b(x){const M=x.attributes;for(const R in M)n.update(M[R],e.ARRAY_BUFFER)}function S(x){const M=[],R=x.index,N=x.attributes.position;let P=0;if(R!==null){const g=R.array;P=R.version;for(let v=0,m=g.length;v<m;v+=3){const O=g[v+0],L=g[v+1],D=g[v+2];M.push(O,L,L,D,D,O)}}else if(N!==void 0){const g=N.array;P=N.version;for(let v=0,m=g.length/3-1;v<m;v+=3){const O=v+0,L=v+1,D=v+2;M.push(O,L,L,D,D,O)}}else return;const o=new(ja(M)?Qa:Ja)(M,1);o.version=P;const r=s.get(x);r&&n.remove(r),s.set(x,o)}function w(x){const M=s.get(x);if(M){const R=x.index;R!==null&&M.version<R.version&&S(x)}else S(x);return s.get(x)}return{get:d,update:b,getWireframeAttribute:w}}function El(e,n,t){let i;function l(M){i=M}let s,h;function d(M){s=M.type,h=M.bytesPerElement}function b(M,R){e.drawElements(i,R,s,M*h),t.update(R,i,1)}function S(M,R,N){N!==0&&(e.drawElementsInstanced(i,R,s,M*h,N),t.update(R,i,N))}function w(M,R,N){if(N===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,R,0,s,M,0,N);let o=0;for(let r=0;r<N;r++)o+=R[r];t.update(o,i,1)}function x(M,R,N,P){if(N===0)return;const o=n.get("WEBGL_multi_draw");if(o===null)for(let r=0;r<M.length;r++)S(M[r]/h,R[r],P[r]);else{o.multiDrawElementsInstancedWEBGL(i,R,0,s,M,0,P,0,N);let r=0;for(let g=0;g<N;g++)r+=R[g]*P[g];t.update(r,i,1)}}this.setMode=l,this.setIndex=d,this.render=b,this.renderInstances=S,this.renderMultiDraw=w,this.renderMultiDrawInstances=x}function Sl(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,h,d){switch(t.calls++,h){case e.TRIANGLES:t.triangles+=d*(s/3);break;case e.LINES:t.lines+=d*(s/2);break;case e.LINE_STRIP:t.lines+=d*(s-1);break;case e.LINE_LOOP:t.lines+=d*s;break;case e.POINTS:t.points+=d*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function l(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:l,update:i}}function Ml(e,n,t){const i=new WeakMap,l=new ft;function s(h,d,b){const S=h.morphTargetInfluences,w=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,x=w!==void 0?w.length:0;let M=i.get(d);if(M===void 0||M.count!==x){let p=function(){D.dispose(),i.delete(d),d.removeEventListener("dispose",p)};M!==void 0&&M.texture.dispose();const R=d.morphAttributes.position!==void 0,N=d.morphAttributes.normal!==void 0,P=d.morphAttributes.color!==void 0,o=d.morphAttributes.position||[],r=d.morphAttributes.normal||[],g=d.morphAttributes.color||[];let v=0;R===!0&&(v=1),N===!0&&(v=2),P===!0&&(v=3);let m=d.attributes.position.count*v,O=1;m>n.maxTextureSize&&(O=Math.ceil(m/n.maxTextureSize),m=n.maxTextureSize);const L=new Float32Array(m*O*4*x),D=new Tr(L,m,O,x);D.type=It,D.needsUpdate=!0;const B=v*4;for(let f=0;f<x;f++){const C=o[f],Y=r[f],H=g[f],q=m*O*4*f;for(let Q=0;Q<C.count;Q++){const W=Q*B;R===!0&&(l.fromBufferAttribute(C,Q),L[q+W+0]=l.x,L[q+W+1]=l.y,L[q+W+2]=l.z,L[q+W+3]=0),N===!0&&(l.fromBufferAttribute(Y,Q),L[q+W+4]=l.x,L[q+W+5]=l.y,L[q+W+6]=l.z,L[q+W+7]=0),P===!0&&(l.fromBufferAttribute(H,Q),L[q+W+8]=l.x,L[q+W+9]=l.y,L[q+W+10]=l.z,L[q+W+11]=H.itemSize===4?l.w:1)}}M={count:x,texture:D,size:new dt(m,O)},i.set(d,M),d.addEventListener("dispose",p)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)b.getUniforms().setValue(e,"morphTexture",h.morphTexture,t);else{let R=0;for(let P=0;P<S.length;P++)R+=S[P];const N=d.morphTargetsRelative?1:1-R;b.getUniforms().setValue(e,"morphTargetBaseInfluence",N),b.getUniforms().setValue(e,"morphTargetInfluences",S)}b.getUniforms().setValue(e,"morphTargetsTexture",M.texture,t),b.getUniforms().setValue(e,"morphTargetsTextureSize",M.size)}return{update:s}}function xl(e,n,t,i){let l=new WeakMap;function s(b){const S=i.render.frame,w=b.geometry,x=n.get(b,w);if(l.get(x)!==S&&(n.update(x),l.set(x,S)),b.isInstancedMesh&&(b.hasEventListener("dispose",d)===!1&&b.addEventListener("dispose",d),l.get(b)!==S&&(t.update(b.instanceMatrix,e.ARRAY_BUFFER),b.instanceColor!==null&&t.update(b.instanceColor,e.ARRAY_BUFFER),l.set(b,S))),b.isSkinnedMesh){const M=b.skeleton;l.get(M)!==S&&(M.update(),l.set(M,S))}return x}function h(){l=new WeakMap}function d(b){const S=b.target;S.removeEventListener("dispose",d),t.remove(S.instanceMatrix),S.instanceColor!==null&&t.remove(S.instanceColor)}return{update:s,dispose:h}}const Dr=new gr,Ki=new ur(1,1),Ir=new Tr,yr=new fo,Nr=new lo,$i=[],Zi=[],Qi=new Float32Array(16),Ji=new Float32Array(9),ji=new Float32Array(4);function Yt(e,n,t){const i=e[0];if(i<=0||i>0)return e;const l=n*t;let s=$i[l];if(s===void 0&&(s=new Float32Array(l),$i[l]=s),n!==0){i.toArray(s,0);for(let h=1,d=0;h!==n;++h)d+=t,e[h].toArray(s,d)}return s}function it(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function rt(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function Mn(e,n){let t=Zi[n];t===void 0&&(t=new Int32Array(n),Zi[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function Tl(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function Al(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(it(t,n))return;e.uniform2fv(this.addr,n),rt(t,n)}}function Rl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(it(t,n))return;e.uniform3fv(this.addr,n),rt(t,n)}}function Cl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(it(t,n))return;e.uniform4fv(this.addr,n),rt(t,n)}}function bl(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(it(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),rt(t,n)}else{if(it(t,i))return;ji.set(i),e.uniformMatrix2fv(this.addr,!1,ji),rt(t,i)}}function Pl(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(it(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),rt(t,n)}else{if(it(t,i))return;Ji.set(i),e.uniformMatrix3fv(this.addr,!1,Ji),rt(t,i)}}function Ll(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(it(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),rt(t,n)}else{if(it(t,i))return;Qi.set(i),e.uniformMatrix4fv(this.addr,!1,Qi),rt(t,i)}}function Ul(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function wl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(it(t,n))return;e.uniform2iv(this.addr,n),rt(t,n)}}function Dl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(it(t,n))return;e.uniform3iv(this.addr,n),rt(t,n)}}function Il(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(it(t,n))return;e.uniform4iv(this.addr,n),rt(t,n)}}function yl(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function Nl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(it(t,n))return;e.uniform2uiv(this.addr,n),rt(t,n)}}function Fl(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(it(t,n))return;e.uniform3uiv(this.addr,n),rt(t,n)}}function Ol(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(it(t,n))return;e.uniform4uiv(this.addr,n),rt(t,n)}}function Bl(e,n,t){const i=this.cache,l=t.allocateTextureUnit();i[0]!==l&&(e.uniform1i(this.addr,l),i[0]=l);let s;this.type===e.SAMPLER_2D_SHADOW?(Ki.compareFunction=pr,s=Ki):s=Dr,t.setTexture2D(n||s,l)}function Hl(e,n,t){const i=this.cache,l=t.allocateTextureUnit();i[0]!==l&&(e.uniform1i(this.addr,l),i[0]=l),t.setTexture3D(n||yr,l)}function Gl(e,n,t){const i=this.cache,l=t.allocateTextureUnit();i[0]!==l&&(e.uniform1i(this.addr,l),i[0]=l),t.setTextureCube(n||Nr,l)}function Vl(e,n,t){const i=this.cache,l=t.allocateTextureUnit();i[0]!==l&&(e.uniform1i(this.addr,l),i[0]=l),t.setTexture2DArray(n||Ir,l)}function zl(e){switch(e){case 5126:return Tl;case 35664:return Al;case 35665:return Rl;case 35666:return Cl;case 35674:return bl;case 35675:return Pl;case 35676:return Ll;case 5124:case 35670:return Ul;case 35667:case 35671:return wl;case 35668:case 35672:return Dl;case 35669:case 35673:return Il;case 5125:return yl;case 36294:return Nl;case 36295:return Fl;case 36296:return Ol;case 35678:case 36198:case 36298:case 36306:case 35682:return Bl;case 35679:case 36299:case 36307:return Hl;case 35680:case 36300:case 36308:case 36293:return Gl;case 36289:case 36303:case 36311:case 36292:return Vl}}function kl(e,n){e.uniform1fv(this.addr,n)}function Wl(e,n){const t=Yt(n,this.size,2);e.uniform2fv(this.addr,t)}function Xl(e,n){const t=Yt(n,this.size,3);e.uniform3fv(this.addr,t)}function Yl(e,n){const t=Yt(n,this.size,4);e.uniform4fv(this.addr,t)}function ql(e,n){const t=Yt(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function Kl(e,n){const t=Yt(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function $l(e,n){const t=Yt(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function Zl(e,n){e.uniform1iv(this.addr,n)}function Ql(e,n){e.uniform2iv(this.addr,n)}function Jl(e,n){e.uniform3iv(this.addr,n)}function jl(e,n){e.uniform4iv(this.addr,n)}function ef(e,n){e.uniform1uiv(this.addr,n)}function tf(e,n){e.uniform2uiv(this.addr,n)}function nf(e,n){e.uniform3uiv(this.addr,n)}function rf(e,n){e.uniform4uiv(this.addr,n)}function af(e,n,t){const i=this.cache,l=n.length,s=Mn(t,l);it(i,s)||(e.uniform1iv(this.addr,s),rt(i,s));for(let h=0;h!==l;++h)t.setTexture2D(n[h]||Dr,s[h])}function of(e,n,t){const i=this.cache,l=n.length,s=Mn(t,l);it(i,s)||(e.uniform1iv(this.addr,s),rt(i,s));for(let h=0;h!==l;++h)t.setTexture3D(n[h]||yr,s[h])}function sf(e,n,t){const i=this.cache,l=n.length,s=Mn(t,l);it(i,s)||(e.uniform1iv(this.addr,s),rt(i,s));for(let h=0;h!==l;++h)t.setTextureCube(n[h]||Nr,s[h])}function cf(e,n,t){const i=this.cache,l=n.length,s=Mn(t,l);it(i,s)||(e.uniform1iv(this.addr,s),rt(i,s));for(let h=0;h!==l;++h)t.setTexture2DArray(n[h]||Ir,s[h])}function lf(e){switch(e){case 5126:return kl;case 35664:return Wl;case 35665:return Xl;case 35666:return Yl;case 35674:return ql;case 35675:return Kl;case 35676:return $l;case 5124:case 35670:return Zl;case 35667:case 35671:return Ql;case 35668:case 35672:return Jl;case 35669:case 35673:return jl;case 5125:return ef;case 36294:return tf;case 36295:return nf;case 36296:return rf;case 35678:case 36198:case 36298:case 36306:case 35682:return af;case 35679:case 36299:case 36307:return of;case 35680:case 36300:case 36308:case 36293:return sf;case 36289:case 36303:case 36311:case 36292:return cf}}class ff{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=zl(t.type)}}class df{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=lf(t.type)}}class uf{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const l=this.seq;for(let s=0,h=l.length;s!==h;++s){const d=l[s];d.setValue(n,t[d.id],i)}}}const Fn=/(\w+)(\])?(\[|\.)?/g;function er(e,n){e.seq.push(n),e.map[n.id]=n}function pf(e,n,t){const i=e.name,l=i.length;for(Fn.lastIndex=0;;){const s=Fn.exec(i),h=Fn.lastIndex;let d=s[1];const b=s[2]==="]",S=s[3];if(b&&(d=d|0),S===void 0||S==="["&&h+2===l){er(t,S===void 0?new ff(d,e,n):new df(d,e,n));break}else{let x=t.map[d];x===void 0&&(x=new uf(d),er(t,x)),t=x}}}class pn{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let l=0;l<i;++l){const s=n.getActiveUniform(t,l),h=n.getUniformLocation(t,s.name);pf(s,h,this)}}setValue(n,t,i,l){const s=this.map[t];s!==void 0&&s.setValue(n,i,l)}setOptional(n,t,i){const l=t[i];l!==void 0&&this.setValue(n,i,l)}static upload(n,t,i,l){for(let s=0,h=t.length;s!==h;++s){const d=t[s],b=i[d.id];b.needsUpdate!==!1&&d.setValue(n,b.value,l)}}static seqWithValue(n,t){const i=[];for(let l=0,s=n.length;l!==s;++l){const h=n[l];h.id in t&&i.push(h)}return i}}function tr(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const hf=37297;let mf=0;function _f(e,n){const t=e.split(`
`),i=[],l=Math.max(n-6,0),s=Math.min(n+6,t.length);for(let h=l;h<s;h++){const d=h+1;i.push(`${d===n?">":" "} ${d}: ${t[h]}`)}return i.join(`
`)}const nr=new Be;function vf(e){nt._getMatrix(nr,nt.workingColorSpace,e);const n=`mat3( ${nr.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(e)){case br:return[n,"LinearTransferOETF"];case qe:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function ir(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),l=e.getShaderInfoLog(n).trim();if(i&&l==="")return"";const s=/ERROR: 0:(\d+)/.exec(l);if(s){const h=parseInt(s[1]);return t.toUpperCase()+`

`+l+`

`+_f(e.getShaderSource(n),h)}else return l}function gf(e,n){const t=vf(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Ef(e,n){let t;switch(n){case co:t="Linear";break;case so:t="Reinhard";break;case oo:t="Cineon";break;case ao:t="ACESFilmic";break;case ro:t="AgX";break;case io:t="Neutral";break;case no:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",n),t="Linear"}return"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ln=new We;function Sf(){nt.getLuminanceCoefficients(ln);const e=ln.x.toFixed(4),n=ln.y.toFixed(4),t=ln.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Mf(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zt).join(`
`)}function xf(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function Tf(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let l=0;l<i;l++){const s=e.getActiveAttrib(n,l),h=s.name;let d=1;s.type===e.FLOAT_MAT2&&(d=2),s.type===e.FLOAT_MAT3&&(d=3),s.type===e.FLOAT_MAT4&&(d=4),t[h]={type:s.type,location:e.getAttribLocation(n,h),locationSize:d}}return t}function Zt(e){return e!==""}function rr(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function ar(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const Af=/^[ \t]*#include +<([\w\d./]+)>/gm;function qn(e){return e.replace(Af,Cf)}const Rf=new Map;function Cf(e,n){let t=Ue[n];if(t===void 0){const i=Rf.get(n);if(i!==void 0)t=Ue[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return qn(t)}const bf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function or(e){return e.replace(bf,Pf)}function Pf(e,n,t,i){let l="";for(let s=parseInt(n);s<parseInt(t);s++)l+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return l}function sr(e){let n=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?n+=`
#define HIGH_PRECISION`:e.precision==="mediump"?n+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(n+=`
#define LOW_PRECISION`),n}function Lf(e){let n="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===mr?n="SHADOWMAP_TYPE_PCF":e.shadowMapType===to?n="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===Mt&&(n="SHADOWMAP_TYPE_VSM"),n}function Uf(e){let n="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case tn:case Xt:n="ENVMAP_TYPE_CUBE";break;case Sn:n="ENVMAP_TYPE_CUBE_UV";break}return n}function wf(e){let n="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case Xt:n="ENVMAP_MODE_REFRACTION";break}return n}function Df(e){let n="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case mo:n="ENVMAP_BLENDING_MULTIPLY";break;case ho:n="ENVMAP_BLENDING_MIX";break;case po:n="ENVMAP_BLENDING_ADD";break}return n}function If(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function yf(e,n,t,i){const l=e.getContext(),s=t.defines;let h=t.vertexShader,d=t.fragmentShader;const b=Lf(t),S=Uf(t),w=wf(t),x=Df(t),M=If(t),R=Mf(t),N=xf(s),P=l.createProgram();let o,r,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(o=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N].filter(Zt).join(`
`),o.length>0&&(o+=`
`),r=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N].filter(Zt).join(`
`),r.length>0&&(r+=`
`)):(o=[sr(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+w:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+b:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zt).join(`
`),r=[sr(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,N,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+S:"",t.envMap?"#define "+w:"",t.envMap?"#define "+x:"",M?"#define CUBEUV_TEXEL_WIDTH "+M.texelWidth:"",M?"#define CUBEUV_TEXEL_HEIGHT "+M.texelHeight:"",M?"#define CUBEUV_MAX_MIP "+M.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+b:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Rt?"#define TONE_MAPPING":"",t.toneMapping!==Rt?Ue.tonemapping_pars_fragment:"",t.toneMapping!==Rt?Ef("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ue.colorspace_pars_fragment,gf("linearToOutputTexel",t.outputColorSpace),Sf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zt).join(`
`)),h=qn(h),h=rr(h,t),h=ar(h,t),d=qn(d),d=rr(d,t),d=ar(d,t),h=or(h),d=or(d),t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,o=[R,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+o,r=["#define varying in",t.glslVersion===Oi?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Oi?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+r);const v=g+o+h,m=g+r+d,O=tr(l,l.VERTEX_SHADER,v),L=tr(l,l.FRAGMENT_SHADER,m);l.attachShader(P,O),l.attachShader(P,L),t.index0AttributeName!==void 0?l.bindAttribLocation(P,0,t.index0AttributeName):t.morphTargets===!0&&l.bindAttribLocation(P,0,"position"),l.linkProgram(P);function D(C){if(e.debug.checkShaderErrors){const Y=l.getProgramInfoLog(P).trim(),H=l.getShaderInfoLog(O).trim(),q=l.getShaderInfoLog(L).trim();let Q=!0,W=!0;if(l.getProgramParameter(P,l.LINK_STATUS)===!1)if(Q=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(l,P,O,L);else{const j=ir(l,O,"vertex"),G=ir(l,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(P,l.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+Y+`
`+j+`
`+G)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(H===""||q==="")&&(W=!1);W&&(C.diagnostics={runnable:Q,programLog:Y,vertexShader:{log:H,prefix:o},fragmentShader:{log:q,prefix:r}})}l.deleteShader(O),l.deleteShader(L),B=new pn(l,P),p=Tf(l,P)}let B;this.getUniforms=function(){return B===void 0&&D(this),B};let p;this.getAttributes=function(){return p===void 0&&D(this),p};let f=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return f===!1&&(f=l.getProgramParameter(P,hf)),f},this.destroy=function(){i.releaseStatesOfProgram(this),l.deleteProgram(P),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=mf++,this.cacheKey=n,this.usedTimes=1,this.program=P,this.vertexShader=O,this.fragmentShader=L,this}let Nf=0;class Ff{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,l=this._getShaderStage(t),s=this._getShaderStage(i),h=this._getShaderCacheForMaterial(n);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(s)===!1&&(h.add(s),s.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new Of(n),t.set(n,i)),i}}class Of{constructor(n){this.id=Nf++,this.code=n,this.usedTimes=0}}function Bf(e,n,t,i,l,s,h){const d=new eo,b=new Ff,S=new Set,w=[],x=l.logarithmicDepthBuffer,M=l.vertexTextures;let R=l.precision;const N={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function P(p){return S.add(p),p===0?"uv":`uv${p}`}function o(p,f,C,Y,H){const q=Y.fog,Q=H.geometry,W=p.isMeshStandardMaterial?Y.environment:null,j=(p.isMeshStandardMaterial?t:n).get(p.envMap||W),G=j&&j.mapping===Sn?j.image.height:null,he=N[p.type];p.precision!==null&&(R=l.getMaxPrecision(p.precision),R!==p.precision&&console.warn("THREE.WebGLProgram.getParameters:",p.precision,"not supported, using",R,"instead."));const Se=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,we=Se!==void 0?Se.length:0;let Ge=0;Q.morphAttributes.position!==void 0&&(Ge=1),Q.morphAttributes.normal!==void 0&&(Ge=2),Q.morphAttributes.color!==void 0&&(Ge=3);let Qe,k,J,de;if(he){const ke=Et[he];Qe=ke.vertexShader,k=ke.fragmentShader}else Qe=p.vertexShader,k=p.fragmentShader,b.update(p),J=b.getVertexShaderID(p),de=b.getFragmentShaderID(p);const ne=e.getRenderTarget(),ge=e.state.buffers.depth.getReversed(),He=H.isInstancedMesh===!0,Te=H.isBatchedMesh===!0,et=!!p.map,Ze=!!p.matcap,De=!!j,_=!!p.aoMap,pt=!!p.lightMap,Ne=!!p.bumpMap,Ie=!!p.normalMap,me=!!p.displacementMap,Ye=!!p.emissiveMap,pe=!!p.metalnessMap,u=!!p.roughnessMap,a=p.anisotropy>0,U=p.clearcoat>0,z=p.dispersion>0,K=p.iridescence>0,V=p.sheen>0,ue=p.transmission>0,ie=a&&!!p.anisotropyMap,Ee=U&&!!p.clearcoatMap,Me=U&&!!p.clearcoatNormalMap,$=U&&!!p.clearcoatRoughnessMap,ce=K&&!!p.iridescenceMap,xe=K&&!!p.iridescenceThicknessMap,Re=V&&!!p.sheenColorMap,le=V&&!!p.sheenRoughnessMap,ye=!!p.specularMap,Le=!!p.specularColorMap,Xe=!!p.specularIntensityMap,E=ue&&!!p.transmissionMap,re=ue&&!!p.thicknessMap,F=!!p.gradientMap,X=!!p.alphaMap,oe=p.alphaTest>0,ae=!!p.alphaHash,Pe=!!p.extensions;let Je=Rt;p.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Je=e.toneMapping);const ot={shaderID:he,shaderType:p.type,shaderName:p.name,vertexShader:Qe,fragmentShader:k,defines:p.defines,customVertexShaderID:J,customFragmentShaderID:de,isRawShaderMaterial:p.isRawShaderMaterial===!0,glslVersion:p.glslVersion,precision:R,batching:Te,batchingColor:Te&&H._colorsTexture!==null,instancing:He,instancingColor:He&&H.instanceColor!==null,instancingMorph:He&&H.morphTexture!==null,supportsVertexTextures:M,outputColorSpace:ne===null?e.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:En,alphaToCoverage:!!p.alphaToCoverage,map:et,matcap:Ze,envMap:De,envMapMode:De&&j.mapping,envMapCubeUVHeight:G,aoMap:_,lightMap:pt,bumpMap:Ne,normalMap:Ie,displacementMap:M&&me,emissiveMap:Ye,normalMapObjectSpace:Ie&&p.normalMapType===Ka,normalMapTangentSpace:Ie&&p.normalMapType===qa,metalnessMap:pe,roughnessMap:u,anisotropy:a,anisotropyMap:ie,clearcoat:U,clearcoatMap:Ee,clearcoatNormalMap:Me,clearcoatRoughnessMap:$,dispersion:z,iridescence:K,iridescenceMap:ce,iridescenceThicknessMap:xe,sheen:V,sheenColorMap:Re,sheenRoughnessMap:le,specularMap:ye,specularColorMap:Le,specularIntensityMap:Xe,transmission:ue,transmissionMap:E,thicknessMap:re,gradientMap:F,opaque:p.transparent===!1&&p.blending===un&&p.alphaToCoverage===!1,alphaMap:X,alphaTest:oe,alphaHash:ae,combine:p.combine,mapUv:et&&P(p.map.channel),aoMapUv:_&&P(p.aoMap.channel),lightMapUv:pt&&P(p.lightMap.channel),bumpMapUv:Ne&&P(p.bumpMap.channel),normalMapUv:Ie&&P(p.normalMap.channel),displacementMapUv:me&&P(p.displacementMap.channel),emissiveMapUv:Ye&&P(p.emissiveMap.channel),metalnessMapUv:pe&&P(p.metalnessMap.channel),roughnessMapUv:u&&P(p.roughnessMap.channel),anisotropyMapUv:ie&&P(p.anisotropyMap.channel),clearcoatMapUv:Ee&&P(p.clearcoatMap.channel),clearcoatNormalMapUv:Me&&P(p.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&P(p.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&P(p.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&P(p.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&P(p.sheenColorMap.channel),sheenRoughnessMapUv:le&&P(p.sheenRoughnessMap.channel),specularMapUv:ye&&P(p.specularMap.channel),specularColorMapUv:Le&&P(p.specularColorMap.channel),specularIntensityMapUv:Xe&&P(p.specularIntensityMap.channel),transmissionMapUv:E&&P(p.transmissionMap.channel),thicknessMapUv:re&&P(p.thicknessMap.channel),alphaMapUv:X&&P(p.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(Ie||a),vertexColors:p.vertexColors,vertexAlphas:p.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!Q.attributes.uv&&(et||X),fog:!!q,useFog:p.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:p.flatShading===!0,sizeAttenuation:p.sizeAttenuation===!0,logarithmicDepthBuffer:x,reverseDepthBuffer:ge,skinning:H.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:Ge,numDirLights:f.directional.length,numPointLights:f.point.length,numSpotLights:f.spot.length,numSpotLightMaps:f.spotLightMap.length,numRectAreaLights:f.rectArea.length,numHemiLights:f.hemi.length,numDirLightShadows:f.directionalShadowMap.length,numPointLightShadows:f.pointShadowMap.length,numSpotLightShadows:f.spotShadowMap.length,numSpotLightShadowsWithMaps:f.numSpotLightShadowsWithMaps,numLightProbes:f.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:p.dithering,shadowMapEnabled:e.shadowMap.enabled&&C.length>0,shadowMapType:e.shadowMap.type,toneMapping:Je,decodeVideoTexture:et&&p.map.isVideoTexture===!0&&nt.getTransfer(p.map.colorSpace)===qe,decodeVideoTextureEmissive:Ye&&p.emissiveMap.isVideoTexture===!0&&nt.getTransfer(p.emissiveMap.colorSpace)===qe,premultipliedAlpha:p.premultipliedAlpha,doubleSided:p.side===xt,flipSided:p.side===_t,useDepthPacking:p.depthPacking>=0,depthPacking:p.depthPacking||0,index0AttributeName:p.index0AttributeName,extensionClipCullDistance:Pe&&p.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pe&&p.extensions.multiDraw===!0||Te)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:p.customProgramCacheKey()};return ot.vertexUv1s=S.has(1),ot.vertexUv2s=S.has(2),ot.vertexUv3s=S.has(3),S.clear(),ot}function r(p){const f=[];if(p.shaderID?f.push(p.shaderID):(f.push(p.customVertexShaderID),f.push(p.customFragmentShaderID)),p.defines!==void 0)for(const C in p.defines)f.push(C),f.push(p.defines[C]);return p.isRawShaderMaterial===!1&&(g(f,p),v(f,p),f.push(e.outputColorSpace)),f.push(p.customProgramCacheKey),f.join()}function g(p,f){p.push(f.precision),p.push(f.outputColorSpace),p.push(f.envMapMode),p.push(f.envMapCubeUVHeight),p.push(f.mapUv),p.push(f.alphaMapUv),p.push(f.lightMapUv),p.push(f.aoMapUv),p.push(f.bumpMapUv),p.push(f.normalMapUv),p.push(f.displacementMapUv),p.push(f.emissiveMapUv),p.push(f.metalnessMapUv),p.push(f.roughnessMapUv),p.push(f.anisotropyMapUv),p.push(f.clearcoatMapUv),p.push(f.clearcoatNormalMapUv),p.push(f.clearcoatRoughnessMapUv),p.push(f.iridescenceMapUv),p.push(f.iridescenceThicknessMapUv),p.push(f.sheenColorMapUv),p.push(f.sheenRoughnessMapUv),p.push(f.specularMapUv),p.push(f.specularColorMapUv),p.push(f.specularIntensityMapUv),p.push(f.transmissionMapUv),p.push(f.thicknessMapUv),p.push(f.combine),p.push(f.fogExp2),p.push(f.sizeAttenuation),p.push(f.morphTargetsCount),p.push(f.morphAttributeCount),p.push(f.numDirLights),p.push(f.numPointLights),p.push(f.numSpotLights),p.push(f.numSpotLightMaps),p.push(f.numHemiLights),p.push(f.numRectAreaLights),p.push(f.numDirLightShadows),p.push(f.numPointLightShadows),p.push(f.numSpotLightShadows),p.push(f.numSpotLightShadowsWithMaps),p.push(f.numLightProbes),p.push(f.shadowMapType),p.push(f.toneMapping),p.push(f.numClippingPlanes),p.push(f.numClipIntersection),p.push(f.depthPacking)}function v(p,f){d.disableAll(),f.supportsVertexTextures&&d.enable(0),f.instancing&&d.enable(1),f.instancingColor&&d.enable(2),f.instancingMorph&&d.enable(3),f.matcap&&d.enable(4),f.envMap&&d.enable(5),f.normalMapObjectSpace&&d.enable(6),f.normalMapTangentSpace&&d.enable(7),f.clearcoat&&d.enable(8),f.iridescence&&d.enable(9),f.alphaTest&&d.enable(10),f.vertexColors&&d.enable(11),f.vertexAlphas&&d.enable(12),f.vertexUv1s&&d.enable(13),f.vertexUv2s&&d.enable(14),f.vertexUv3s&&d.enable(15),f.vertexTangents&&d.enable(16),f.anisotropy&&d.enable(17),f.alphaHash&&d.enable(18),f.batching&&d.enable(19),f.dispersion&&d.enable(20),f.batchingColor&&d.enable(21),p.push(d.mask),d.disableAll(),f.fog&&d.enable(0),f.useFog&&d.enable(1),f.flatShading&&d.enable(2),f.logarithmicDepthBuffer&&d.enable(3),f.reverseDepthBuffer&&d.enable(4),f.skinning&&d.enable(5),f.morphTargets&&d.enable(6),f.morphNormals&&d.enable(7),f.morphColors&&d.enable(8),f.premultipliedAlpha&&d.enable(9),f.shadowMapEnabled&&d.enable(10),f.doubleSided&&d.enable(11),f.flipSided&&d.enable(12),f.useDepthPacking&&d.enable(13),f.dithering&&d.enable(14),f.transmission&&d.enable(15),f.sheen&&d.enable(16),f.opaque&&d.enable(17),f.pointsUvs&&d.enable(18),f.decodeVideoTexture&&d.enable(19),f.decodeVideoTextureEmissive&&d.enable(20),f.alphaToCoverage&&d.enable(21),p.push(d.mask)}function m(p){const f=N[p.type];let C;if(f){const Y=Et[f];C=Ya.clone(Y.uniforms)}else C=p.uniforms;return C}function O(p,f){let C;for(let Y=0,H=w.length;Y<H;Y++){const q=w[Y];if(q.cacheKey===f){C=q,++C.usedTimes;break}}return C===void 0&&(C=new yf(e,f,p,s),w.push(C)),C}function L(p){if(--p.usedTimes===0){const f=w.indexOf(p);w[f]=w[w.length-1],w.pop(),p.destroy()}}function D(p){b.remove(p)}function B(){b.dispose()}return{getParameters:o,getProgramCacheKey:r,getUniforms:m,acquireProgram:O,releaseProgram:L,releaseShaderCache:D,programs:w,dispose:B}}function Hf(){let e=new WeakMap;function n(h){return e.has(h)}function t(h){let d=e.get(h);return d===void 0&&(d={},e.set(h,d)),d}function i(h){e.delete(h)}function l(h,d,b){e.get(h)[d]=b}function s(){e=new WeakMap}return{has:n,get:t,remove:i,update:l,dispose:s}}function Gf(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.z!==n.z?e.z-n.z:e.id-n.id}function cr(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function lr(){const e=[];let n=0;const t=[],i=[],l=[];function s(){n=0,t.length=0,i.length=0,l.length=0}function h(x,M,R,N,P,o){let r=e[n];return r===void 0?(r={id:x.id,object:x,geometry:M,material:R,groupOrder:N,renderOrder:x.renderOrder,z:P,group:o},e[n]=r):(r.id=x.id,r.object=x,r.geometry=M,r.material=R,r.groupOrder=N,r.renderOrder=x.renderOrder,r.z=P,r.group=o),n++,r}function d(x,M,R,N,P,o){const r=h(x,M,R,N,P,o);R.transmission>0?i.push(r):R.transparent===!0?l.push(r):t.push(r)}function b(x,M,R,N,P,o){const r=h(x,M,R,N,P,o);R.transmission>0?i.unshift(r):R.transparent===!0?l.unshift(r):t.unshift(r)}function S(x,M){t.length>1&&t.sort(x||Gf),i.length>1&&i.sort(M||cr),l.length>1&&l.sort(M||cr)}function w(){for(let x=n,M=e.length;x<M;x++){const R=e[x];if(R.id===null)break;R.id=null,R.object=null,R.geometry=null,R.material=null,R.group=null}}return{opaque:t,transmissive:i,transparent:l,init:s,push:d,unshift:b,finish:w,sort:S}}function Vf(){let e=new WeakMap;function n(i,l){const s=e.get(i);let h;return s===void 0?(h=new lr,e.set(i,[h])):l>=s.length?(h=new lr,s.push(h)):h=s[l],h}function t(){e=new WeakMap}return{get:n,dispose:t}}function zf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new We,color:new $e};break;case"SpotLight":t={position:new We,direction:new We,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new We,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new We,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new We,halfWidth:new We,halfHeight:new We};break}return e[n.id]=t,t}}}function kf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let Wf=0;function Xf(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function Yf(e){const n=new zf,t=kf(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let S=0;S<9;S++)i.probe.push(new We);const l=new We,s=new kt,h=new kt;function d(S){let w=0,x=0,M=0;for(let p=0;p<9;p++)i.probe[p].set(0,0,0);let R=0,N=0,P=0,o=0,r=0,g=0,v=0,m=0,O=0,L=0,D=0;S.sort(Xf);for(let p=0,f=S.length;p<f;p++){const C=S[p],Y=C.color,H=C.intensity,q=C.distance,Q=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)w+=Y.r*H,x+=Y.g*H,M+=Y.b*H;else if(C.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(C.sh.coefficients[W],H);D++}else if(C.isDirectionalLight){const W=n.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const j=C.shadow,G=t.get(C);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,i.directionalShadow[R]=G,i.directionalShadowMap[R]=Q,i.directionalShadowMatrix[R]=C.shadow.matrix,g++}i.directional[R]=W,R++}else if(C.isSpotLight){const W=n.get(C);W.position.setFromMatrixPosition(C.matrixWorld),W.color.copy(Y).multiplyScalar(H),W.distance=q,W.coneCos=Math.cos(C.angle),W.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),W.decay=C.decay,i.spot[P]=W;const j=C.shadow;if(C.map&&(i.spotLightMap[O]=C.map,O++,j.updateMatrices(C),C.castShadow&&L++),i.spotLightMatrix[P]=j.matrix,C.castShadow){const G=t.get(C);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,i.spotShadow[P]=G,i.spotShadowMap[P]=Q,m++}P++}else if(C.isRectAreaLight){const W=n.get(C);W.color.copy(Y).multiplyScalar(H),W.halfWidth.set(C.width*.5,0,0),W.halfHeight.set(0,C.height*.5,0),i.rectArea[o]=W,o++}else if(C.isPointLight){const W=n.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity),W.distance=C.distance,W.decay=C.decay,C.castShadow){const j=C.shadow,G=t.get(C);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,G.shadowCameraNear=j.camera.near,G.shadowCameraFar=j.camera.far,i.pointShadow[N]=G,i.pointShadowMap[N]=Q,i.pointShadowMatrix[N]=C.shadow.matrix,v++}i.point[N]=W,N++}else if(C.isHemisphereLight){const W=n.get(C);W.skyColor.copy(C.color).multiplyScalar(H),W.groundColor.copy(C.groundColor).multiplyScalar(H),i.hemi[r]=W,r++}}o>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ee.LTC_FLOAT_1,i.rectAreaLTC2=ee.LTC_FLOAT_2):(i.rectAreaLTC1=ee.LTC_HALF_1,i.rectAreaLTC2=ee.LTC_HALF_2)),i.ambient[0]=w,i.ambient[1]=x,i.ambient[2]=M;const B=i.hash;(B.directionalLength!==R||B.pointLength!==N||B.spotLength!==P||B.rectAreaLength!==o||B.hemiLength!==r||B.numDirectionalShadows!==g||B.numPointShadows!==v||B.numSpotShadows!==m||B.numSpotMaps!==O||B.numLightProbes!==D)&&(i.directional.length=R,i.spot.length=P,i.rectArea.length=o,i.point.length=N,i.hemi.length=r,i.directionalShadow.length=g,i.directionalShadowMap.length=g,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=m,i.spotShadowMap.length=m,i.directionalShadowMatrix.length=g,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=m+O-L,i.spotLightMap.length=O,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=D,B.directionalLength=R,B.pointLength=N,B.spotLength=P,B.rectAreaLength=o,B.hemiLength=r,B.numDirectionalShadows=g,B.numPointShadows=v,B.numSpotShadows=m,B.numSpotMaps=O,B.numLightProbes=D,i.version=Wf++)}function b(S,w){let x=0,M=0,R=0,N=0,P=0;const o=w.matrixWorldInverse;for(let r=0,g=S.length;r<g;r++){const v=S[r];if(v.isDirectionalLight){const m=i.directional[x];m.direction.setFromMatrixPosition(v.matrixWorld),l.setFromMatrixPosition(v.target.matrixWorld),m.direction.sub(l),m.direction.transformDirection(o),x++}else if(v.isSpotLight){const m=i.spot[R];m.position.setFromMatrixPosition(v.matrixWorld),m.position.applyMatrix4(o),m.direction.setFromMatrixPosition(v.matrixWorld),l.setFromMatrixPosition(v.target.matrixWorld),m.direction.sub(l),m.direction.transformDirection(o),R++}else if(v.isRectAreaLight){const m=i.rectArea[N];m.position.setFromMatrixPosition(v.matrixWorld),m.position.applyMatrix4(o),h.identity(),s.copy(v.matrixWorld),s.premultiply(o),h.extractRotation(s),m.halfWidth.set(v.width*.5,0,0),m.halfHeight.set(0,v.height*.5,0),m.halfWidth.applyMatrix4(h),m.halfHeight.applyMatrix4(h),N++}else if(v.isPointLight){const m=i.point[M];m.position.setFromMatrixPosition(v.matrixWorld),m.position.applyMatrix4(o),M++}else if(v.isHemisphereLight){const m=i.hemi[P];m.direction.setFromMatrixPosition(v.matrixWorld),m.direction.transformDirection(o),P++}}}return{setup:d,setupView:b,state:i}}function fr(e){const n=new Yf(e),t=[],i=[];function l(w){S.camera=w,t.length=0,i.length=0}function s(w){t.push(w)}function h(w){i.push(w)}function d(){n.setup(t)}function b(w){n.setupView(t,w)}const S={lightsArray:t,shadowsArray:i,camera:null,lights:n,transmissionRenderTarget:{}};return{init:l,state:S,setupLights:d,setupLightsView:b,pushLight:s,pushShadow:h}}function qf(e){let n=new WeakMap;function t(l,s=0){const h=n.get(l);let d;return h===void 0?(d=new fr(e),n.set(l,[d])):s>=h.length?(d=new fr(e),h.push(d)):d=h[s],d}function i(){n=new WeakMap}return{get:t,dispose:i}}const Kf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$f=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Zf(e,n,t){let i=new dr;const l=new dt,s=new dt,h=new ft,d=new wa({depthPacking:Da}),b=new Ia,S={},w=t.maxTextureSize,x={[Jt]:_t,[_t]:Jt,[xt]:xt},M=new Ct({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new dt},radius:{value:4}},vertexShader:Kf,fragmentShader:$f}),R=M.clone();R.defines.HORIZONTAL_PASS=1;const N=new hr;N.setAttribute("position",new dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const P=new At(N,M),o=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mr;let r=this.type;this.render=function(L,D,B){if(o.enabled===!1||o.autoUpdate===!1&&o.needsUpdate===!1||L.length===0)return;const p=e.getRenderTarget(),f=e.getActiveCubeFace(),C=e.getActiveMipmapLevel(),Y=e.state;Y.setBlending(yt),Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);const H=r!==Mt&&this.type===Mt,q=r===Mt&&this.type!==Mt;for(let Q=0,W=L.length;Q<W;Q++){const j=L[Q],G=j.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;l.copy(G.mapSize);const he=G.getFrameExtents();if(l.multiply(he),s.copy(G.mapSize),(l.x>w||l.y>w)&&(l.x>w&&(s.x=Math.floor(w/he.x),l.x=s.x*he.x,G.mapSize.x=s.x),l.y>w&&(s.y=Math.floor(w/he.y),l.y=s.y*he.y,G.mapSize.y=s.y)),G.map===null||H===!0||q===!0){const we=this.type!==Mt?{minFilter:zt,magFilter:zt}:{};G.map!==null&&G.map.dispose(),G.map=new Wt(l.x,l.y,we),G.map.texture.name=j.name+".shadowMap",G.camera.updateProjectionMatrix()}e.setRenderTarget(G.map),e.clear();const Se=G.getViewportCount();for(let we=0;we<Se;we++){const Ge=G.getViewport(we);h.set(s.x*Ge.x,s.y*Ge.y,s.x*Ge.z,s.y*Ge.w),Y.viewport(h),G.updateMatrices(j,we),i=G.getFrustum(),m(D,B,G.camera,j,this.type)}G.isPointLightShadow!==!0&&this.type===Mt&&g(G,B),G.needsUpdate=!1}r=this.type,o.needsUpdate=!1,e.setRenderTarget(p,f,C)};function g(L,D){const B=n.update(P);M.defines.VSM_SAMPLES!==L.blurSamples&&(M.defines.VSM_SAMPLES=L.blurSamples,R.defines.VSM_SAMPLES=L.blurSamples,M.needsUpdate=!0,R.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new Wt(l.x,l.y)),M.uniforms.shadow_pass.value=L.map.texture,M.uniforms.resolution.value=L.mapSize,M.uniforms.radius.value=L.radius,e.setRenderTarget(L.mapPass),e.clear(),e.renderBufferDirect(D,null,B,M,P,null),R.uniforms.shadow_pass.value=L.mapPass.texture,R.uniforms.resolution.value=L.mapSize,R.uniforms.radius.value=L.radius,e.setRenderTarget(L.map),e.clear(),e.renderBufferDirect(D,null,B,R,P,null)}function v(L,D,B,p){let f=null;const C=B.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(C!==void 0)f=C;else if(f=B.isPointLight===!0?b:d,e.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const Y=f.uuid,H=D.uuid;let q=S[Y];q===void 0&&(q={},S[Y]=q);let Q=q[H];Q===void 0&&(Q=f.clone(),q[H]=Q,D.addEventListener("dispose",O)),f=Q}if(f.visible=D.visible,f.wireframe=D.wireframe,p===Mt?f.side=D.shadowSide!==null?D.shadowSide:D.side:f.side=D.shadowSide!==null?D.shadowSide:x[D.side],f.alphaMap=D.alphaMap,f.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,f.map=D.map,f.clipShadows=D.clipShadows,f.clippingPlanes=D.clippingPlanes,f.clipIntersection=D.clipIntersection,f.displacementMap=D.displacementMap,f.displacementScale=D.displacementScale,f.displacementBias=D.displacementBias,f.wireframeLinewidth=D.wireframeLinewidth,f.linewidth=D.linewidth,B.isPointLight===!0&&f.isMeshDistanceMaterial===!0){const Y=e.properties.get(f);Y.light=B}return f}function m(L,D,B,p,f){if(L.visible===!1)return;if(L.layers.test(D.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&f===Mt)&&(!L.frustumCulled||i.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,L.matrixWorld);const H=n.update(L),q=L.material;if(Array.isArray(q)){const Q=H.groups;for(let W=0,j=Q.length;W<j;W++){const G=Q[W],he=q[G.materialIndex];if(he&&he.visible){const Se=v(L,he,p,f);L.onBeforeShadow(e,L,D,B,H,Se,G),e.renderBufferDirect(B,null,H,Se,L,G),L.onAfterShadow(e,L,D,B,H,Se,G)}}}else if(q.visible){const Q=v(L,q,p,f);L.onBeforeShadow(e,L,D,B,H,Q,null),e.renderBufferDirect(B,null,H,Q,L,null),L.onAfterShadow(e,L,D,B,H,Q,null)}}const Y=L.children;for(let H=0,q=Y.length;H<q;H++)m(Y[H],D,B,p,f)}function O(L){L.target.removeEventListener("dispose",O);for(const B in S){const p=S[B],f=L.target.uuid;f in p&&(p[f].dispose(),delete p[f])}}}const Qf={[kn]:zn,[Vn]:Bn,[Gn]:On,[mn]:Hn,[zn]:kn,[Bn]:Vn,[On]:Gn,[Hn]:mn};function Jf(e,n){function t(){let E=!1;const re=new ft;let F=null;const X=new ft(0,0,0,0);return{setMask:function(oe){F!==oe&&!E&&(e.colorMask(oe,oe,oe,oe),F=oe)},setLocked:function(oe){E=oe},setClear:function(oe,ae,Pe,Je,ot){ot===!0&&(oe*=Je,ae*=Je,Pe*=Je),re.set(oe,ae,Pe,Je),X.equals(re)===!1&&(e.clearColor(oe,ae,Pe,Je),X.copy(re))},reset:function(){E=!1,F=null,X.set(-1,0,0,0)}}}function i(){let E=!1,re=!1,F=null,X=null,oe=null;return{setReversed:function(ae){if(re!==ae){const Pe=n.get("EXT_clip_control");ae?Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.ZERO_TO_ONE_EXT):Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.NEGATIVE_ONE_TO_ONE_EXT),re=ae;const Je=oe;oe=null,this.setClear(Je)}},getReversed:function(){return re},setTest:function(ae){ae?ne(e.DEPTH_TEST):ge(e.DEPTH_TEST)},setMask:function(ae){F!==ae&&!E&&(e.depthMask(ae),F=ae)},setFunc:function(ae){if(re&&(ae=Qf[ae]),X!==ae){switch(ae){case kn:e.depthFunc(e.NEVER);break;case zn:e.depthFunc(e.ALWAYS);break;case Vn:e.depthFunc(e.LESS);break;case mn:e.depthFunc(e.LEQUAL);break;case Gn:e.depthFunc(e.EQUAL);break;case Hn:e.depthFunc(e.GEQUAL);break;case Bn:e.depthFunc(e.GREATER);break;case On:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}X=ae}},setLocked:function(ae){E=ae},setClear:function(ae){oe!==ae&&(re&&(ae=1-ae),e.clearDepth(ae),oe=ae)},reset:function(){E=!1,F=null,X=null,oe=null,re=!1}}}function l(){let E=!1,re=null,F=null,X=null,oe=null,ae=null,Pe=null,Je=null,ot=null;return{setTest:function(ke){E||(ke?ne(e.STENCIL_TEST):ge(e.STENCIL_TEST))},setMask:function(ke){re!==ke&&!E&&(e.stencilMask(ke),re=ke)},setFunc:function(ke,vt,St){(F!==ke||X!==vt||oe!==St)&&(e.stencilFunc(ke,vt,St),F=ke,X=vt,oe=St)},setOp:function(ke,vt,St){(ae!==ke||Pe!==vt||Je!==St)&&(e.stencilOp(ke,vt,St),ae=ke,Pe=vt,Je=St)},setLocked:function(ke){E=ke},setClear:function(ke){ot!==ke&&(e.clearStencil(ke),ot=ke)},reset:function(){E=!1,re=null,F=null,X=null,oe=null,ae=null,Pe=null,Je=null,ot=null}}}const s=new t,h=new i,d=new l,b=new WeakMap,S=new WeakMap;let w={},x={},M=new WeakMap,R=[],N=null,P=!1,o=null,r=null,g=null,v=null,m=null,O=null,L=null,D=new $e(0,0,0),B=0,p=!1,f=null,C=null,Y=null,H=null,q=null;const Q=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,j=0;const G=e.getParameter(e.VERSION);G.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(G)[1]),W=j>=1):G.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),W=j>=2);let he=null,Se={};const we=e.getParameter(e.SCISSOR_BOX),Ge=e.getParameter(e.VIEWPORT),Qe=new ft().fromArray(we),k=new ft().fromArray(Ge);function J(E,re,F,X){const oe=new Uint8Array(4),ae=e.createTexture();e.bindTexture(E,ae),e.texParameteri(E,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(E,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Pe=0;Pe<F;Pe++)E===e.TEXTURE_3D||E===e.TEXTURE_2D_ARRAY?e.texImage3D(re,0,e.RGBA,1,1,X,0,e.RGBA,e.UNSIGNED_BYTE,oe):e.texImage2D(re+Pe,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,oe);return ae}const de={};de[e.TEXTURE_2D]=J(e.TEXTURE_2D,e.TEXTURE_2D,1),de[e.TEXTURE_CUBE_MAP]=J(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[e.TEXTURE_2D_ARRAY]=J(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),de[e.TEXTURE_3D]=J(e.TEXTURE_3D,e.TEXTURE_3D,1,1),s.setClear(0,0,0,1),h.setClear(1),d.setClear(0),ne(e.DEPTH_TEST),h.setFunc(mn),Ne(!1),Ie(wi),ne(e.CULL_FACE),_(yt);function ne(E){w[E]!==!0&&(e.enable(E),w[E]=!0)}function ge(E){w[E]!==!1&&(e.disable(E),w[E]=!1)}function He(E,re){return x[E]!==re?(e.bindFramebuffer(E,re),x[E]=re,E===e.DRAW_FRAMEBUFFER&&(x[e.FRAMEBUFFER]=re),E===e.FRAMEBUFFER&&(x[e.DRAW_FRAMEBUFFER]=re),!0):!1}function Te(E,re){let F=R,X=!1;if(E){F=M.get(re),F===void 0&&(F=[],M.set(re,F));const oe=E.textures;if(F.length!==oe.length||F[0]!==e.COLOR_ATTACHMENT0){for(let ae=0,Pe=oe.length;ae<Pe;ae++)F[ae]=e.COLOR_ATTACHMENT0+ae;F.length=oe.length,X=!0}}else F[0]!==e.BACK&&(F[0]=e.BACK,X=!0);X&&e.drawBuffers(F)}function et(E){return N!==E?(e.useProgram(E),N=E,!0):!1}const Ze={[Kt]:e.FUNC_ADD,[ia]:e.FUNC_SUBTRACT,[na]:e.FUNC_REVERSE_SUBTRACT};Ze[_o]=e.MIN,Ze[vo]=e.MAX;const De={[ga]:e.ZERO,[va]:e.ONE,[_a]:e.SRC_COLOR,[ma]:e.SRC_ALPHA,[ha]:e.SRC_ALPHA_SATURATE,[pa]:e.DST_COLOR,[ua]:e.DST_ALPHA,[da]:e.ONE_MINUS_SRC_COLOR,[fa]:e.ONE_MINUS_SRC_ALPHA,[la]:e.ONE_MINUS_DST_COLOR,[ca]:e.ONE_MINUS_DST_ALPHA,[sa]:e.CONSTANT_COLOR,[oa]:e.ONE_MINUS_CONSTANT_COLOR,[aa]:e.CONSTANT_ALPHA,[ra]:e.ONE_MINUS_CONSTANT_ALPHA};function _(E,re,F,X,oe,ae,Pe,Je,ot,ke){if(E===yt){P===!0&&(ge(e.BLEND),P=!1);return}if(P===!1&&(ne(e.BLEND),P=!0),E!==Wa){if(E!==o||ke!==p){if((r!==Kt||m!==Kt)&&(e.blendEquation(e.FUNC_ADD),r=Kt,m=Kt),ke)switch(E){case un:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case yi:e.blendFunc(e.ONE,e.ONE);break;case Ii:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Di:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",E);break}else switch(E){case un:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case yi:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case Ii:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Di:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",E);break}g=null,v=null,O=null,L=null,D.set(0,0,0),B=0,o=E,p=ke}return}oe=oe||re,ae=ae||F,Pe=Pe||X,(re!==r||oe!==m)&&(e.blendEquationSeparate(Ze[re],Ze[oe]),r=re,m=oe),(F!==g||X!==v||ae!==O||Pe!==L)&&(e.blendFuncSeparate(De[F],De[X],De[ae],De[Pe]),g=F,v=X,O=ae,L=Pe),(Je.equals(D)===!1||ot!==B)&&(e.blendColor(Je.r,Je.g,Je.b,ot),D.copy(Je),B=ot),o=E,p=!1}function pt(E,re){E.side===xt?ge(e.CULL_FACE):ne(e.CULL_FACE);let F=E.side===_t;re&&(F=!F),Ne(F),E.blending===un&&E.transparent===!1?_(yt):_(E.blending,E.blendEquation,E.blendSrc,E.blendDst,E.blendEquationAlpha,E.blendSrcAlpha,E.blendDstAlpha,E.blendColor,E.blendAlpha,E.premultipliedAlpha),h.setFunc(E.depthFunc),h.setTest(E.depthTest),h.setMask(E.depthWrite),s.setMask(E.colorWrite);const X=E.stencilWrite;d.setTest(X),X&&(d.setMask(E.stencilWriteMask),d.setFunc(E.stencilFunc,E.stencilRef,E.stencilFuncMask),d.setOp(E.stencilFail,E.stencilZFail,E.stencilZPass)),Ye(E.polygonOffset,E.polygonOffsetFactor,E.polygonOffsetUnits),E.alphaToCoverage===!0?ne(e.SAMPLE_ALPHA_TO_COVERAGE):ge(e.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(E){f!==E&&(E?e.frontFace(e.CW):e.frontFace(e.CCW),f=E)}function Ie(E){E!==za?(ne(e.CULL_FACE),E!==C&&(E===wi?e.cullFace(e.BACK):E===ka?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):ge(e.CULL_FACE),C=E}function me(E){E!==Y&&(W&&e.lineWidth(E),Y=E)}function Ye(E,re,F){E?(ne(e.POLYGON_OFFSET_FILL),(H!==re||q!==F)&&(e.polygonOffset(re,F),H=re,q=F)):ge(e.POLYGON_OFFSET_FILL)}function pe(E){E?ne(e.SCISSOR_TEST):ge(e.SCISSOR_TEST)}function u(E){E===void 0&&(E=e.TEXTURE0+Q-1),he!==E&&(e.activeTexture(E),he=E)}function a(E,re,F){F===void 0&&(he===null?F=e.TEXTURE0+Q-1:F=he);let X=Se[F];X===void 0&&(X={type:void 0,texture:void 0},Se[F]=X),(X.type!==E||X.texture!==re)&&(he!==F&&(e.activeTexture(F),he=F),e.bindTexture(E,re||de[E]),X.type=E,X.texture=re)}function U(){const E=Se[he];E!==void 0&&E.type!==void 0&&(e.bindTexture(E.type,null),E.type=void 0,E.texture=void 0)}function z(){try{e.compressedTexImage2D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function K(){try{e.compressedTexImage3D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function V(){try{e.texSubImage2D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function ue(){try{e.texSubImage3D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function ie(){try{e.compressedTexSubImage2D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function Ee(){try{e.compressedTexSubImage3D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function Me(){try{e.texStorage2D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function $(){try{e.texStorage3D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function ce(){try{e.texImage2D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function xe(){try{e.texImage3D(...arguments)}catch(E){console.error("THREE.WebGLState:",E)}}function Re(E){Qe.equals(E)===!1&&(e.scissor(E.x,E.y,E.z,E.w),Qe.copy(E))}function le(E){k.equals(E)===!1&&(e.viewport(E.x,E.y,E.z,E.w),k.copy(E))}function ye(E,re){let F=S.get(re);F===void 0&&(F=new WeakMap,S.set(re,F));let X=F.get(E);X===void 0&&(X=e.getUniformBlockIndex(re,E.name),F.set(E,X))}function Le(E,re){const X=S.get(re).get(E);b.get(re)!==X&&(e.uniformBlockBinding(re,X,E.__bindingPointIndex),b.set(re,X))}function Xe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),h.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),w={},he=null,Se={},x={},M=new WeakMap,R=[],N=null,P=!1,o=null,r=null,g=null,v=null,m=null,O=null,L=null,D=new $e(0,0,0),B=0,p=!1,f=null,C=null,Y=null,H=null,q=null,Qe.set(0,0,e.canvas.width,e.canvas.height),k.set(0,0,e.canvas.width,e.canvas.height),s.reset(),h.reset(),d.reset()}return{buffers:{color:s,depth:h,stencil:d},enable:ne,disable:ge,bindFramebuffer:He,drawBuffers:Te,useProgram:et,setBlending:_,setMaterial:pt,setFlipSided:Ne,setCullFace:Ie,setLineWidth:me,setPolygonOffset:Ye,setScissorTest:pe,activeTexture:u,bindTexture:a,unbindTexture:U,compressedTexImage2D:z,compressedTexImage3D:K,texImage2D:ce,texImage3D:xe,updateUBOMapping:ye,uniformBlockBinding:Le,texStorage2D:Me,texStorage3D:$,texSubImage2D:V,texSubImage3D:ue,compressedTexSubImage2D:ie,compressedTexSubImage3D:Ee,scissor:Re,viewport:le,reset:Xe}}function jf(e,n,t,i,l,s,h){const d=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,b=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),S=new dt,w=new WeakMap;let x;const M=new WeakMap;let R=!1;try{R=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function N(u,a){return R?new OffscreenCanvas(u,a):uo("canvas")}function P(u,a,U){let z=1;const K=pe(u);if((K.width>U||K.height>U)&&(z=U/Math.max(K.width,K.height)),z<1)if(typeof HTMLImageElement<"u"&&u instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&u instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&u instanceof ImageBitmap||typeof VideoFrame<"u"&&u instanceof VideoFrame){const V=Math.floor(z*K.width),ue=Math.floor(z*K.height);x===void 0&&(x=N(V,ue));const ie=a?N(V,ue):x;return ie.width=V,ie.height=ue,ie.getContext("2d").drawImage(u,0,0,V,ue),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+V+"x"+ue+")."),ie}else return"data"in u&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),u;return u}function o(u){return u.generateMipmaps}function r(u){e.generateMipmap(u)}function g(u){return u.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:u.isWebGL3DRenderTarget?e.TEXTURE_3D:u.isWebGLArrayRenderTarget||u.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function v(u,a,U,z,K=!1){if(u!==null){if(e[u]!==void 0)return e[u];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+u+"'")}let V=a;if(a===e.RED&&(U===e.FLOAT&&(V=e.R32F),U===e.HALF_FLOAT&&(V=e.R16F),U===e.UNSIGNED_BYTE&&(V=e.R8)),a===e.RED_INTEGER&&(U===e.UNSIGNED_BYTE&&(V=e.R8UI),U===e.UNSIGNED_SHORT&&(V=e.R16UI),U===e.UNSIGNED_INT&&(V=e.R32UI),U===e.BYTE&&(V=e.R8I),U===e.SHORT&&(V=e.R16I),U===e.INT&&(V=e.R32I)),a===e.RG&&(U===e.FLOAT&&(V=e.RG32F),U===e.HALF_FLOAT&&(V=e.RG16F),U===e.UNSIGNED_BYTE&&(V=e.RG8)),a===e.RG_INTEGER&&(U===e.UNSIGNED_BYTE&&(V=e.RG8UI),U===e.UNSIGNED_SHORT&&(V=e.RG16UI),U===e.UNSIGNED_INT&&(V=e.RG32UI),U===e.BYTE&&(V=e.RG8I),U===e.SHORT&&(V=e.RG16I),U===e.INT&&(V=e.RG32I)),a===e.RGB_INTEGER&&(U===e.UNSIGNED_BYTE&&(V=e.RGB8UI),U===e.UNSIGNED_SHORT&&(V=e.RGB16UI),U===e.UNSIGNED_INT&&(V=e.RGB32UI),U===e.BYTE&&(V=e.RGB8I),U===e.SHORT&&(V=e.RGB16I),U===e.INT&&(V=e.RGB32I)),a===e.RGBA_INTEGER&&(U===e.UNSIGNED_BYTE&&(V=e.RGBA8UI),U===e.UNSIGNED_SHORT&&(V=e.RGBA16UI),U===e.UNSIGNED_INT&&(V=e.RGBA32UI),U===e.BYTE&&(V=e.RGBA8I),U===e.SHORT&&(V=e.RGBA16I),U===e.INT&&(V=e.RGBA32I)),a===e.RGB&&U===e.UNSIGNED_INT_5_9_9_9_REV&&(V=e.RGB9_E5),a===e.RGBA){const ue=K?br:nt.getTransfer(z);U===e.FLOAT&&(V=e.RGBA32F),U===e.HALF_FLOAT&&(V=e.RGBA16F),U===e.UNSIGNED_BYTE&&(V=ue===qe?e.SRGB8_ALPHA8:e.RGBA8),U===e.UNSIGNED_SHORT_4_4_4_4&&(V=e.RGBA4),U===e.UNSIGNED_SHORT_5_5_5_1&&(V=e.RGB5_A1)}return(V===e.R16F||V===e.R32F||V===e.RG16F||V===e.RG32F||V===e.RGBA16F||V===e.RGBA32F)&&n.get("EXT_color_buffer_float"),V}function m(u,a){let U;return u?a===null||a===en||a===jt?U=e.DEPTH24_STENCIL8:a===It?U=e.DEPTH32F_STENCIL8:a===_n&&(U=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):a===null||a===en||a===jt?U=e.DEPTH_COMPONENT24:a===It?U=e.DEPTH_COMPONENT32F:a===_n&&(U=e.DEPTH_COMPONENT16),U}function O(u,a){return o(u)===!0||u.isFramebufferTexture&&u.minFilter!==zt&&u.minFilter!==Gt?Math.log2(Math.max(a.width,a.height))+1:u.mipmaps!==void 0&&u.mipmaps.length>0?u.mipmaps.length:u.isCompressedTexture&&Array.isArray(u.image)?a.mipmaps.length:1}function L(u){const a=u.target;a.removeEventListener("dispose",L),B(a),a.isVideoTexture&&w.delete(a)}function D(u){const a=u.target;a.removeEventListener("dispose",D),f(a)}function B(u){const a=i.get(u);if(a.__webglInit===void 0)return;const U=u.source,z=M.get(U);if(z){const K=z[a.__cacheKey];K.usedTimes--,K.usedTimes===0&&p(u),Object.keys(z).length===0&&M.delete(U)}i.remove(u)}function p(u){const a=i.get(u);e.deleteTexture(a.__webglTexture);const U=u.source,z=M.get(U);delete z[a.__cacheKey],h.memory.textures--}function f(u){const a=i.get(u);if(u.depthTexture&&(u.depthTexture.dispose(),i.remove(u.depthTexture)),u.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(a.__webglFramebuffer[z]))for(let K=0;K<a.__webglFramebuffer[z].length;K++)e.deleteFramebuffer(a.__webglFramebuffer[z][K]);else e.deleteFramebuffer(a.__webglFramebuffer[z]);a.__webglDepthbuffer&&e.deleteRenderbuffer(a.__webglDepthbuffer[z])}else{if(Array.isArray(a.__webglFramebuffer))for(let z=0;z<a.__webglFramebuffer.length;z++)e.deleteFramebuffer(a.__webglFramebuffer[z]);else e.deleteFramebuffer(a.__webglFramebuffer);if(a.__webglDepthbuffer&&e.deleteRenderbuffer(a.__webglDepthbuffer),a.__webglMultisampledFramebuffer&&e.deleteFramebuffer(a.__webglMultisampledFramebuffer),a.__webglColorRenderbuffer)for(let z=0;z<a.__webglColorRenderbuffer.length;z++)a.__webglColorRenderbuffer[z]&&e.deleteRenderbuffer(a.__webglColorRenderbuffer[z]);a.__webglDepthRenderbuffer&&e.deleteRenderbuffer(a.__webglDepthRenderbuffer)}const U=u.textures;for(let z=0,K=U.length;z<K;z++){const V=i.get(U[z]);V.__webglTexture&&(e.deleteTexture(V.__webglTexture),h.memory.textures--),i.remove(U[z])}i.remove(u)}let C=0;function Y(){C=0}function H(){const u=C;return u>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+u+" texture units while this GPU supports only "+l.maxTextures),C+=1,u}function q(u){const a=[];return a.push(u.wrapS),a.push(u.wrapT),a.push(u.wrapR||0),a.push(u.magFilter),a.push(u.minFilter),a.push(u.anisotropy),a.push(u.internalFormat),a.push(u.format),a.push(u.type),a.push(u.generateMipmaps),a.push(u.premultiplyAlpha),a.push(u.flipY),a.push(u.unpackAlignment),a.push(u.colorSpace),a.join()}function Q(u,a){const U=i.get(u);if(u.isVideoTexture&&me(u),u.isRenderTargetTexture===!1&&u.version>0&&U.__version!==u.version){const z=u.image;if(z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{k(U,u,a);return}}t.bindTexture(e.TEXTURE_2D,U.__webglTexture,e.TEXTURE0+a)}function W(u,a){const U=i.get(u);if(u.version>0&&U.__version!==u.version){k(U,u,a);return}t.bindTexture(e.TEXTURE_2D_ARRAY,U.__webglTexture,e.TEXTURE0+a)}function j(u,a){const U=i.get(u);if(u.version>0&&U.__version!==u.version){k(U,u,a);return}t.bindTexture(e.TEXTURE_3D,U.__webglTexture,e.TEXTURE0+a)}function G(u,a){const U=i.get(u);if(u.version>0&&U.__version!==u.version){J(U,u,a);return}t.bindTexture(e.TEXTURE_CUBE_MAP,U.__webglTexture,e.TEXTURE0+a)}const he={[Ma]:e.REPEAT,[Sa]:e.CLAMP_TO_EDGE,[Ea]:e.MIRRORED_REPEAT},Se={[zt]:e.NEAREST,[xa]:e.NEAREST_MIPMAP_NEAREST,[an]:e.NEAREST_MIPMAP_LINEAR,[Gt]:e.LINEAR,[Rn]:e.LINEAR_MIPMAP_NEAREST,[$t]:e.LINEAR_MIPMAP_LINEAR},we={[La]:e.NEVER,[Pa]:e.ALWAYS,[ba]:e.LESS,[pr]:e.LEQUAL,[Ca]:e.EQUAL,[Ra]:e.GEQUAL,[Aa]:e.GREATER,[Ta]:e.NOTEQUAL};function Ge(u,a){if(a.type===It&&n.has("OES_texture_float_linear")===!1&&(a.magFilter===Gt||a.magFilter===Rn||a.magFilter===an||a.magFilter===$t||a.minFilter===Gt||a.minFilter===Rn||a.minFilter===an||a.minFilter===$t)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(u,e.TEXTURE_WRAP_S,he[a.wrapS]),e.texParameteri(u,e.TEXTURE_WRAP_T,he[a.wrapT]),(u===e.TEXTURE_3D||u===e.TEXTURE_2D_ARRAY)&&e.texParameteri(u,e.TEXTURE_WRAP_R,he[a.wrapR]),e.texParameteri(u,e.TEXTURE_MAG_FILTER,Se[a.magFilter]),e.texParameteri(u,e.TEXTURE_MIN_FILTER,Se[a.minFilter]),a.compareFunction&&(e.texParameteri(u,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(u,e.TEXTURE_COMPARE_FUNC,we[a.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(a.magFilter===zt||a.minFilter!==an&&a.minFilter!==$t||a.type===It&&n.has("OES_texture_float_linear")===!1)return;if(a.anisotropy>1||i.get(a).__currentAnisotropy){const U=n.get("EXT_texture_filter_anisotropic");e.texParameterf(u,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,l.getMaxAnisotropy())),i.get(a).__currentAnisotropy=a.anisotropy}}}function Qe(u,a){let U=!1;u.__webglInit===void 0&&(u.__webglInit=!0,a.addEventListener("dispose",L));const z=a.source;let K=M.get(z);K===void 0&&(K={},M.set(z,K));const V=q(a);if(V!==u.__cacheKey){K[V]===void 0&&(K[V]={texture:e.createTexture(),usedTimes:0},h.memory.textures++,U=!0),K[V].usedTimes++;const ue=K[u.__cacheKey];ue!==void 0&&(K[u.__cacheKey].usedTimes--,ue.usedTimes===0&&p(a)),u.__cacheKey=V,u.__webglTexture=K[V].texture}return U}function k(u,a,U){let z=e.TEXTURE_2D;(a.isDataArrayTexture||a.isCompressedArrayTexture)&&(z=e.TEXTURE_2D_ARRAY),a.isData3DTexture&&(z=e.TEXTURE_3D);const K=Qe(u,a),V=a.source;t.bindTexture(z,u.__webglTexture,e.TEXTURE0+U);const ue=i.get(V);if(V.version!==ue.__version||K===!0){t.activeTexture(e.TEXTURE0+U);const ie=nt.getPrimaries(nt.workingColorSpace),Ee=a.colorSpace===Ht?null:nt.getPrimaries(a.colorSpace),Me=a.colorSpace===Ht||ie===Ee?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,a.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,a.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let $=P(a.image,!1,l.maxTextureSize);$=Ye(a,$);const ce=s.convert(a.format,a.colorSpace),xe=s.convert(a.type);let Re=v(a.internalFormat,ce,xe,a.colorSpace,a.isVideoTexture);Ge(z,a);let le;const ye=a.mipmaps,Le=a.isVideoTexture!==!0,Xe=ue.__version===void 0||K===!0,E=V.dataReady,re=O(a,$);if(a.isDepthTexture)Re=m(a.format===hn,a.type),Xe&&(Le?t.texStorage2D(e.TEXTURE_2D,1,Re,$.width,$.height):t.texImage2D(e.TEXTURE_2D,0,Re,$.width,$.height,0,ce,xe,null));else if(a.isDataTexture)if(ye.length>0){Le&&Xe&&t.texStorage2D(e.TEXTURE_2D,re,Re,ye[0].width,ye[0].height);for(let F=0,X=ye.length;F<X;F++)le=ye[F],Le?E&&t.texSubImage2D(e.TEXTURE_2D,F,0,0,le.width,le.height,ce,xe,le.data):t.texImage2D(e.TEXTURE_2D,F,Re,le.width,le.height,0,ce,xe,le.data);a.generateMipmaps=!1}else Le?(Xe&&t.texStorage2D(e.TEXTURE_2D,re,Re,$.width,$.height),E&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,$.width,$.height,ce,xe,$.data)):t.texImage2D(e.TEXTURE_2D,0,Re,$.width,$.height,0,ce,xe,$.data);else if(a.isCompressedTexture)if(a.isCompressedArrayTexture){Le&&Xe&&t.texStorage3D(e.TEXTURE_2D_ARRAY,re,Re,ye[0].width,ye[0].height,$.depth);for(let F=0,X=ye.length;F<X;F++)if(le=ye[F],a.format!==Tt)if(ce!==null)if(Le){if(E)if(a.layerUpdates.size>0){const oe=Fi(le.width,le.height,a.format,a.type);for(const ae of a.layerUpdates){const Pe=le.data.subarray(ae*oe/le.data.BYTES_PER_ELEMENT,(ae+1)*oe/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,F,0,0,ae,le.width,le.height,1,ce,Pe)}a.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,F,0,0,0,le.width,le.height,$.depth,ce,le.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,F,Re,le.width,le.height,$.depth,0,le.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Le?E&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,F,0,0,0,le.width,le.height,$.depth,ce,xe,le.data):t.texImage3D(e.TEXTURE_2D_ARRAY,F,Re,le.width,le.height,$.depth,0,ce,xe,le.data)}else{Le&&Xe&&t.texStorage2D(e.TEXTURE_2D,re,Re,ye[0].width,ye[0].height);for(let F=0,X=ye.length;F<X;F++)le=ye[F],a.format!==Tt?ce!==null?Le?E&&t.compressedTexSubImage2D(e.TEXTURE_2D,F,0,0,le.width,le.height,ce,le.data):t.compressedTexImage2D(e.TEXTURE_2D,F,Re,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Le?E&&t.texSubImage2D(e.TEXTURE_2D,F,0,0,le.width,le.height,ce,xe,le.data):t.texImage2D(e.TEXTURE_2D,F,Re,le.width,le.height,0,ce,xe,le.data)}else if(a.isDataArrayTexture)if(Le){if(Xe&&t.texStorage3D(e.TEXTURE_2D_ARRAY,re,Re,$.width,$.height,$.depth),E)if(a.layerUpdates.size>0){const F=Fi($.width,$.height,a.format,a.type);for(const X of a.layerUpdates){const oe=$.data.subarray(X*F/$.data.BYTES_PER_ELEMENT,(X+1)*F/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,X,$.width,$.height,1,ce,xe,oe)}a.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,ce,xe,$.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,Re,$.width,$.height,$.depth,0,ce,xe,$.data);else if(a.isData3DTexture)Le?(Xe&&t.texStorage3D(e.TEXTURE_3D,re,Re,$.width,$.height,$.depth),E&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,ce,xe,$.data)):t.texImage3D(e.TEXTURE_3D,0,Re,$.width,$.height,$.depth,0,ce,xe,$.data);else if(a.isFramebufferTexture){if(Xe)if(Le)t.texStorage2D(e.TEXTURE_2D,re,Re,$.width,$.height);else{let F=$.width,X=$.height;for(let oe=0;oe<re;oe++)t.texImage2D(e.TEXTURE_2D,oe,Re,F,X,0,ce,xe,null),F>>=1,X>>=1}}else if(ye.length>0){if(Le&&Xe){const F=pe(ye[0]);t.texStorage2D(e.TEXTURE_2D,re,Re,F.width,F.height)}for(let F=0,X=ye.length;F<X;F++)le=ye[F],Le?E&&t.texSubImage2D(e.TEXTURE_2D,F,0,0,ce,xe,le):t.texImage2D(e.TEXTURE_2D,F,Re,ce,xe,le);a.generateMipmaps=!1}else if(Le){if(Xe){const F=pe($);t.texStorage2D(e.TEXTURE_2D,re,Re,F.width,F.height)}E&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,ce,xe,$)}else t.texImage2D(e.TEXTURE_2D,0,Re,ce,xe,$);o(a)&&r(z),ue.__version=V.version,a.onUpdate&&a.onUpdate(a)}u.__version=a.version}function J(u,a,U){if(a.image.length!==6)return;const z=Qe(u,a),K=a.source;t.bindTexture(e.TEXTURE_CUBE_MAP,u.__webglTexture,e.TEXTURE0+U);const V=i.get(K);if(K.version!==V.__version||z===!0){t.activeTexture(e.TEXTURE0+U);const ue=nt.getPrimaries(nt.workingColorSpace),ie=a.colorSpace===Ht?null:nt.getPrimaries(a.colorSpace),Ee=a.colorSpace===Ht||ue===ie?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,a.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,a.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const Me=a.isCompressedTexture||a.image[0].isCompressedTexture,$=a.image[0]&&a.image[0].isDataTexture,ce=[];for(let X=0;X<6;X++)!Me&&!$?ce[X]=P(a.image[X],!0,l.maxCubemapSize):ce[X]=$?a.image[X].image:a.image[X],ce[X]=Ye(a,ce[X]);const xe=ce[0],Re=s.convert(a.format,a.colorSpace),le=s.convert(a.type),ye=v(a.internalFormat,Re,le,a.colorSpace),Le=a.isVideoTexture!==!0,Xe=V.__version===void 0||z===!0,E=K.dataReady;let re=O(a,xe);Ge(e.TEXTURE_CUBE_MAP,a);let F;if(Me){Le&&Xe&&t.texStorage2D(e.TEXTURE_CUBE_MAP,re,ye,xe.width,xe.height);for(let X=0;X<6;X++){F=ce[X].mipmaps;for(let oe=0;oe<F.length;oe++){const ae=F[oe];a.format!==Tt?Re!==null?Le?E&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,oe,0,0,ae.width,ae.height,Re,ae.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,oe,ye,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Le?E&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,oe,0,0,ae.width,ae.height,Re,le,ae.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,oe,ye,ae.width,ae.height,0,Re,le,ae.data)}}}else{if(F=a.mipmaps,Le&&Xe){F.length>0&&re++;const X=pe(ce[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,re,ye,X.width,X.height)}for(let X=0;X<6;X++)if($){Le?E&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,ce[X].width,ce[X].height,Re,le,ce[X].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,ye,ce[X].width,ce[X].height,0,Re,le,ce[X].data);for(let oe=0;oe<F.length;oe++){const Pe=F[oe].image[X].image;Le?E&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,oe+1,0,0,Pe.width,Pe.height,Re,le,Pe.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,oe+1,ye,Pe.width,Pe.height,0,Re,le,Pe.data)}}else{Le?E&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,Re,le,ce[X]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,ye,Re,le,ce[X]);for(let oe=0;oe<F.length;oe++){const ae=F[oe];Le?E&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,oe+1,0,0,Re,le,ae.image[X]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,oe+1,ye,Re,le,ae.image[X])}}}o(a)&&r(e.TEXTURE_CUBE_MAP),V.__version=K.version,a.onUpdate&&a.onUpdate(a)}u.__version=a.version}function de(u,a,U,z,K,V){const ue=s.convert(U.format,U.colorSpace),ie=s.convert(U.type),Ee=v(U.internalFormat,ue,ie,U.colorSpace),Me=i.get(a),$=i.get(U);if($.__renderTarget=a,!Me.__hasExternalTextures){const ce=Math.max(1,a.width>>V),xe=Math.max(1,a.height>>V);K===e.TEXTURE_3D||K===e.TEXTURE_2D_ARRAY?t.texImage3D(K,V,Ee,ce,xe,a.depth,0,ue,ie,null):t.texImage2D(K,V,Ee,ce,xe,0,ue,ie,null)}t.bindFramebuffer(e.FRAMEBUFFER,u),Ie(a)?d.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,z,K,$.__webglTexture,0,Ne(a)):(K===e.TEXTURE_2D||K>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,z,K,$.__webglTexture,V),t.bindFramebuffer(e.FRAMEBUFFER,null)}function ne(u,a,U){if(e.bindRenderbuffer(e.RENDERBUFFER,u),a.depthBuffer){const z=a.depthTexture,K=z&&z.isDepthTexture?z.type:null,V=m(a.stencilBuffer,K),ue=a.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ie=Ne(a);Ie(a)?d.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ie,V,a.width,a.height):U?e.renderbufferStorageMultisample(e.RENDERBUFFER,ie,V,a.width,a.height):e.renderbufferStorage(e.RENDERBUFFER,V,a.width,a.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,ue,e.RENDERBUFFER,u)}else{const z=a.textures;for(let K=0;K<z.length;K++){const V=z[K],ue=s.convert(V.format,V.colorSpace),ie=s.convert(V.type),Ee=v(V.internalFormat,ue,ie,V.colorSpace),Me=Ne(a);U&&Ie(a)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,Me,Ee,a.width,a.height):Ie(a)?d.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Me,Ee,a.width,a.height):e.renderbufferStorage(e.RENDERBUFFER,Ee,a.width,a.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ge(u,a){if(a&&a.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(e.FRAMEBUFFER,u),!(a.depthTexture&&a.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const z=i.get(a.depthTexture);z.__renderTarget=a,(!z.__webglTexture||a.depthTexture.image.width!==a.width||a.depthTexture.image.height!==a.height)&&(a.depthTexture.image.width=a.width,a.depthTexture.image.height=a.height,a.depthTexture.needsUpdate=!0),Q(a.depthTexture,0);const K=z.__webglTexture,V=Ne(a);if(a.depthTexture.format===Kn)Ie(a)?d.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0,V):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0);else if(a.depthTexture.format===hn)Ie(a)?d.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0,V):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function He(u){const a=i.get(u),U=u.isWebGLCubeRenderTarget===!0;if(a.__boundDepthTexture!==u.depthTexture){const z=u.depthTexture;if(a.__depthDisposeCallback&&a.__depthDisposeCallback(),z){const K=()=>{delete a.__boundDepthTexture,delete a.__depthDisposeCallback,z.removeEventListener("dispose",K)};z.addEventListener("dispose",K),a.__depthDisposeCallback=K}a.__boundDepthTexture=z}if(u.depthTexture&&!a.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");const z=u.texture.mipmaps;z&&z.length>0?ge(a.__webglFramebuffer[0],u):ge(a.__webglFramebuffer,u)}else if(U){a.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(e.FRAMEBUFFER,a.__webglFramebuffer[z]),a.__webglDepthbuffer[z]===void 0)a.__webglDepthbuffer[z]=e.createRenderbuffer(),ne(a.__webglDepthbuffer[z],u,!1);else{const K=u.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,V=a.__webglDepthbuffer[z];e.bindRenderbuffer(e.RENDERBUFFER,V),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,V)}}else{const z=u.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(e.FRAMEBUFFER,a.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,a.__webglFramebuffer),a.__webglDepthbuffer===void 0)a.__webglDepthbuffer=e.createRenderbuffer(),ne(a.__webglDepthbuffer,u,!1);else{const K=u.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,V=a.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,V),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,V)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function Te(u,a,U){const z=i.get(u);a!==void 0&&de(z.__webglFramebuffer,u,u.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),U!==void 0&&He(u)}function et(u){const a=u.texture,U=i.get(u),z=i.get(a);u.addEventListener("dispose",D);const K=u.textures,V=u.isWebGLCubeRenderTarget===!0,ue=K.length>1;if(ue||(z.__webglTexture===void 0&&(z.__webglTexture=e.createTexture()),z.__version=a.version,h.memory.textures++),V){U.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(a.mipmaps&&a.mipmaps.length>0){U.__webglFramebuffer[ie]=[];for(let Ee=0;Ee<a.mipmaps.length;Ee++)U.__webglFramebuffer[ie][Ee]=e.createFramebuffer()}else U.__webglFramebuffer[ie]=e.createFramebuffer()}else{if(a.mipmaps&&a.mipmaps.length>0){U.__webglFramebuffer=[];for(let ie=0;ie<a.mipmaps.length;ie++)U.__webglFramebuffer[ie]=e.createFramebuffer()}else U.__webglFramebuffer=e.createFramebuffer();if(ue)for(let ie=0,Ee=K.length;ie<Ee;ie++){const Me=i.get(K[ie]);Me.__webglTexture===void 0&&(Me.__webglTexture=e.createTexture(),h.memory.textures++)}if(u.samples>0&&Ie(u)===!1){U.__webglMultisampledFramebuffer=e.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let ie=0;ie<K.length;ie++){const Ee=K[ie];U.__webglColorRenderbuffer[ie]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,U.__webglColorRenderbuffer[ie]);const Me=s.convert(Ee.format,Ee.colorSpace),$=s.convert(Ee.type),ce=v(Ee.internalFormat,Me,$,Ee.colorSpace,u.isXRRenderTarget===!0),xe=Ne(u);e.renderbufferStorageMultisample(e.RENDERBUFFER,xe,ce,u.width,u.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ie,e.RENDERBUFFER,U.__webglColorRenderbuffer[ie])}e.bindRenderbuffer(e.RENDERBUFFER,null),u.depthBuffer&&(U.__webglDepthRenderbuffer=e.createRenderbuffer(),ne(U.__webglDepthRenderbuffer,u,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(V){t.bindTexture(e.TEXTURE_CUBE_MAP,z.__webglTexture),Ge(e.TEXTURE_CUBE_MAP,a);for(let ie=0;ie<6;ie++)if(a.mipmaps&&a.mipmaps.length>0)for(let Ee=0;Ee<a.mipmaps.length;Ee++)de(U.__webglFramebuffer[ie][Ee],u,a,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ee);else de(U.__webglFramebuffer[ie],u,a,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);o(a)&&r(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let ie=0,Ee=K.length;ie<Ee;ie++){const Me=K[ie],$=i.get(Me);t.bindTexture(e.TEXTURE_2D,$.__webglTexture),Ge(e.TEXTURE_2D,Me),de(U.__webglFramebuffer,u,Me,e.COLOR_ATTACHMENT0+ie,e.TEXTURE_2D,0),o(Me)&&r(e.TEXTURE_2D)}t.unbindTexture()}else{let ie=e.TEXTURE_2D;if((u.isWebGL3DRenderTarget||u.isWebGLArrayRenderTarget)&&(ie=u.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(ie,z.__webglTexture),Ge(ie,a),a.mipmaps&&a.mipmaps.length>0)for(let Ee=0;Ee<a.mipmaps.length;Ee++)de(U.__webglFramebuffer[Ee],u,a,e.COLOR_ATTACHMENT0,ie,Ee);else de(U.__webglFramebuffer,u,a,e.COLOR_ATTACHMENT0,ie,0);o(a)&&r(ie),t.unbindTexture()}u.depthBuffer&&He(u)}function Ze(u){const a=u.textures;for(let U=0,z=a.length;U<z;U++){const K=a[U];if(o(K)){const V=g(u),ue=i.get(K).__webglTexture;t.bindTexture(V,ue),r(V),t.unbindTexture()}}}const De=[],_=[];function pt(u){if(u.samples>0){if(Ie(u)===!1){const a=u.textures,U=u.width,z=u.height;let K=e.COLOR_BUFFER_BIT;const V=u.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ue=i.get(u),ie=a.length>1;if(ie)for(let Me=0;Me<a.length;Me++)t.bindFramebuffer(e.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Me,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,ue.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Me,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const Ee=u.texture.mipmaps;Ee&&Ee.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let Me=0;Me<a.length;Me++){if(u.resolveDepthBuffer&&(u.depthBuffer&&(K|=e.DEPTH_BUFFER_BIT),u.stencilBuffer&&u.resolveStencilBuffer&&(K|=e.STENCIL_BUFFER_BIT)),ie){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,ue.__webglColorRenderbuffer[Me]);const $=i.get(a[Me]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,$,0)}e.blitFramebuffer(0,0,U,z,0,0,U,z,K,e.NEAREST),b===!0&&(De.length=0,_.length=0,De.push(e.COLOR_ATTACHMENT0+Me),u.depthBuffer&&u.resolveDepthBuffer===!1&&(De.push(V),_.push(V),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,_)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,De))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),ie)for(let Me=0;Me<a.length;Me++){t.bindFramebuffer(e.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Me,e.RENDERBUFFER,ue.__webglColorRenderbuffer[Me]);const $=i.get(a[Me]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,ue.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Me,e.TEXTURE_2D,$,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(u.depthBuffer&&u.resolveDepthBuffer===!1&&b){const a=u.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[a])}}}function Ne(u){return Math.min(l.maxSamples,u.samples)}function Ie(u){const a=i.get(u);return u.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&a.__useRenderToTexture!==!1}function me(u){const a=h.render.frame;w.get(u)!==a&&(w.set(u,a),u.update())}function Ye(u,a){const U=u.colorSpace,z=u.format,K=u.type;return u.isCompressedTexture===!0||u.isVideoTexture===!0||U!==En&&U!==Ht&&(nt.getTransfer(U)===qe?(z!==Tt||K!==Nt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),a}function pe(u){return typeof HTMLImageElement<"u"&&u instanceof HTMLImageElement?(S.width=u.naturalWidth||u.width,S.height=u.naturalHeight||u.height):typeof VideoFrame<"u"&&u instanceof VideoFrame?(S.width=u.displayWidth,S.height=u.displayHeight):(S.width=u.width,S.height=u.height),S}this.allocateTextureUnit=H,this.resetTextureUnits=Y,this.setTexture2D=Q,this.setTexture2DArray=W,this.setTexture3D=j,this.setTextureCube=G,this.rebindTextures=Te,this.setupRenderTarget=et,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=pt,this.setupDepthRenderbuffer=He,this.setupFrameBufferTexture=de,this.useMultisampledRTT=Ie}function ed(e,n){function t(i,l=Ht){let s;const h=nt.getTransfer(l);if(i===Nt)return e.UNSIGNED_BYTE;if(i===_r)return e.UNSIGNED_SHORT_4_4_4_4;if(i===vr)return e.UNSIGNED_SHORT_5_5_5_1;if(i===ya)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Na)return e.BYTE;if(i===Fa)return e.SHORT;if(i===_n)return e.UNSIGNED_SHORT;if(i===Er)return e.INT;if(i===en)return e.UNSIGNED_INT;if(i===It)return e.FLOAT;if(i===gn)return e.HALF_FLOAT;if(i===Oa)return e.ALPHA;if(i===Ba)return e.RGB;if(i===Tt)return e.RGBA;if(i===Kn)return e.DEPTH_COMPONENT;if(i===hn)return e.DEPTH_STENCIL;if(i===Ha)return e.RED;if(i===Sr)return e.RED_INTEGER;if(i===Ga)return e.RG;if(i===Mr)return e.RG_INTEGER;if(i===xr)return e.RGBA_INTEGER;if(i===Cn||i===bn||i===Pn||i===Ln)if(h===qe)if(s=n.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Cn)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===bn)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Pn)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ln)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=n.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Cn)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===bn)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Pn)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ln)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ai||i===oi||i===si||i===ci)if(s=n.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===ai)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===oi)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===si)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ci)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===li||i===fi||i===di)if(s=n.get("WEBGL_compressed_texture_etc"),s!==null){if(i===li||i===fi)return h===qe?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===di)return h===qe?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ui||i===pi||i===hi||i===mi||i===_i||i===vi||i===gi||i===Ei||i===Si||i===Mi||i===xi||i===Ti||i===Ai||i===Ri)if(s=n.get("WEBGL_compressed_texture_astc"),s!==null){if(i===ui)return h===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===pi)return h===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===hi)return h===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===mi)return h===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===_i)return h===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===vi)return h===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===gi)return h===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ei)return h===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Si)return h===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Mi)return h===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===xi)return h===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ti)return h===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ai)return h===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ri)return h===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Un||i===Ci||i===bi)if(s=n.get("EXT_texture_compression_bptc"),s!==null){if(i===Un)return h===qe?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ci)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===bi)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Va||i===Pi||i===Li||i===Ui)if(s=n.get("EXT_texture_compression_rgtc"),s!==null){if(i===Un)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Pi)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Li)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ui)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===jt?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const td=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,nd=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class id{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t,i){if(this.texture===null){const l=new gr,s=n.properties.get(l);s.__webglTexture=t.texture,(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=l}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new Ct({vertexShader:td,fragmentShader:nd,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new At(new $n(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class rd extends jr{constructor(n,t){super();const i=this;let l=null,s=1,h=null,d="local-floor",b=1,S=null,w=null,x=null,M=null,R=null,N=null;const P=new id,o=t.getContextAttributes();let r=null,g=null;const v=[],m=[],O=new dt;let L=null;const D=new Qt;D.viewport=new ft;const B=new Qt;B.viewport=new ft;const p=[D,B],f=new ea;let C=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let J=v[k];return J===void 0&&(J=new An,v[k]=J),J.getTargetRaySpace()},this.getControllerGrip=function(k){let J=v[k];return J===void 0&&(J=new An,v[k]=J),J.getGripSpace()},this.getHand=function(k){let J=v[k];return J===void 0&&(J=new An,v[k]=J),J.getHandSpace()};function H(k){const J=m.indexOf(k.inputSource);if(J===-1)return;const de=v[J];de!==void 0&&(de.update(k.inputSource,k.frame,S||h),de.dispatchEvent({type:k.type,data:k.inputSource}))}function q(){l.removeEventListener("select",H),l.removeEventListener("selectstart",H),l.removeEventListener("selectend",H),l.removeEventListener("squeeze",H),l.removeEventListener("squeezestart",H),l.removeEventListener("squeezeend",H),l.removeEventListener("end",q),l.removeEventListener("inputsourceschange",Q);for(let k=0;k<v.length;k++){const J=m[k];J!==null&&(m[k]=null,v[k].disconnect(J))}C=null,Y=null,P.reset(),n.setRenderTarget(r),R=null,M=null,x=null,l=null,g=null,Qe.stop(),i.isPresenting=!1,n.setPixelRatio(L),n.setSize(O.width,O.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){s=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){d=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return S||h},this.setReferenceSpace=function(k){S=k},this.getBaseLayer=function(){return M!==null?M:R},this.getBinding=function(){return x},this.getFrame=function(){return N},this.getSession=function(){return l},this.setSession=async function(k){if(l=k,l!==null){if(r=n.getRenderTarget(),l.addEventListener("select",H),l.addEventListener("selectstart",H),l.addEventListener("selectend",H),l.addEventListener("squeeze",H),l.addEventListener("squeezestart",H),l.addEventListener("squeezeend",H),l.addEventListener("end",q),l.addEventListener("inputsourceschange",Q),o.xrCompatible!==!0&&await t.makeXRCompatible(),L=n.getPixelRatio(),n.getSize(O),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,ne=null,ge=null;o.depth&&(ge=o.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=o.stencil?hn:Kn,ne=o.stencil?jt:en);const He={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:s};x=new XRWebGLBinding(l,t),M=x.createProjectionLayer(He),l.updateRenderState({layers:[M]}),n.setPixelRatio(1),n.setSize(M.textureWidth,M.textureHeight,!1),g=new Wt(M.textureWidth,M.textureHeight,{format:Tt,type:Nt,depthTexture:new ur(M.textureWidth,M.textureHeight,ne,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:o.stencil,colorSpace:n.outputColorSpace,samples:o.antialias?4:0,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}else{const de={antialias:o.antialias,alpha:!0,depth:o.depth,stencil:o.stencil,framebufferScaleFactor:s};R=new XRWebGLLayer(l,t,de),l.updateRenderState({baseLayer:R}),n.setPixelRatio(1),n.setSize(R.framebufferWidth,R.framebufferHeight,!1),g=new Wt(R.framebufferWidth,R.framebufferHeight,{format:Tt,type:Nt,colorSpace:n.outputColorSpace,stencilBuffer:o.stencil,resolveDepthBuffer:R.ignoreDepthValues===!1,resolveStencilBuffer:R.ignoreDepthValues===!1})}g.isXRRenderTarget=!0,this.setFoveation(b),S=null,h=await l.requestReferenceSpace(d),Qe.setContext(l),Qe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return P.getDepthTexture()};function Q(k){for(let J=0;J<k.removed.length;J++){const de=k.removed[J],ne=m.indexOf(de);ne>=0&&(m[ne]=null,v[ne].disconnect(de))}for(let J=0;J<k.added.length;J++){const de=k.added[J];let ne=m.indexOf(de);if(ne===-1){for(let He=0;He<v.length;He++)if(He>=m.length){m.push(de),ne=He;break}else if(m[He]===null){m[He]=de,ne=He;break}if(ne===-1)break}const ge=v[ne];ge&&ge.connect(de)}}const W=new We,j=new We;function G(k,J,de){W.setFromMatrixPosition(J.matrixWorld),j.setFromMatrixPosition(de.matrixWorld);const ne=W.distanceTo(j),ge=J.projectionMatrix.elements,He=de.projectionMatrix.elements,Te=ge[14]/(ge[10]-1),et=ge[14]/(ge[10]+1),Ze=(ge[9]+1)/ge[5],De=(ge[9]-1)/ge[5],_=(ge[8]-1)/ge[0],pt=(He[8]+1)/He[0],Ne=Te*_,Ie=Te*pt,me=ne/(-_+pt),Ye=me*-_;if(J.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(Ye),k.translateZ(me),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),ge[10]===-1)k.projectionMatrix.copy(J.projectionMatrix),k.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const pe=Te+me,u=et+me,a=Ne-Ye,U=Ie+(ne-Ye),z=Ze*et/u*pe,K=De*et/u*pe;k.projectionMatrix.makePerspective(a,U,z,K,pe,u),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function he(k,J){J===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(J.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(l===null)return;let J=k.near,de=k.far;P.texture!==null&&(P.depthNear>0&&(J=P.depthNear),P.depthFar>0&&(de=P.depthFar)),f.near=B.near=D.near=J,f.far=B.far=D.far=de,(C!==f.near||Y!==f.far)&&(l.updateRenderState({depthNear:f.near,depthFar:f.far}),C=f.near,Y=f.far),D.layers.mask=k.layers.mask|2,B.layers.mask=k.layers.mask|4,f.layers.mask=D.layers.mask|B.layers.mask;const ne=k.parent,ge=f.cameras;he(f,ne);for(let He=0;He<ge.length;He++)he(ge[He],ne);ge.length===2?G(f,D,B):f.projectionMatrix.copy(D.projectionMatrix),Se(k,f,ne)};function Se(k,J,de){de===null?k.matrix.copy(J.matrixWorld):(k.matrix.copy(de.matrixWorld),k.matrix.invert(),k.matrix.multiply(J.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(J.projectionMatrix),k.projectionMatrixInverse.copy(J.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=ta*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return f},this.getFoveation=function(){if(!(M===null&&R===null))return b},this.setFoveation=function(k){b=k,M!==null&&(M.fixedFoveation=k),R!==null&&R.fixedFoveation!==void 0&&(R.fixedFoveation=k)},this.hasDepthSensing=function(){return P.texture!==null},this.getDepthSensingMesh=function(){return P.getMesh(f)};let we=null;function Ge(k,J){if(w=J.getViewerPose(S||h),N=J,w!==null){const de=w.views;R!==null&&(n.setRenderTargetFramebuffer(g,R.framebuffer),n.setRenderTarget(g));let ne=!1;de.length!==f.cameras.length&&(f.cameras.length=0,ne=!0);for(let Te=0;Te<de.length;Te++){const et=de[Te];let Ze=null;if(R!==null)Ze=R.getViewport(et);else{const _=x.getViewSubImage(M,et);Ze=_.viewport,Te===0&&(n.setRenderTargetTextures(g,_.colorTexture,_.depthStencilTexture),n.setRenderTarget(g))}let De=p[Te];De===void 0&&(De=new Qt,De.layers.enable(Te),De.viewport=new ft,p[Te]=De),De.matrix.fromArray(et.transform.matrix),De.matrix.decompose(De.position,De.quaternion,De.scale),De.projectionMatrix.fromArray(et.projectionMatrix),De.projectionMatrixInverse.copy(De.projectionMatrix).invert(),De.viewport.set(Ze.x,Ze.y,Ze.width,Ze.height),Te===0&&(f.matrix.copy(De.matrix),f.matrix.decompose(f.position,f.quaternion,f.scale)),ne===!0&&f.cameras.push(De)}const ge=l.enabledFeatures;if(ge&&ge.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&x){const Te=x.getDepthInformation(de[0]);Te&&Te.isValid&&Te.texture&&P.init(n,Te,l.renderState)}}for(let de=0;de<v.length;de++){const ne=m[de],ge=v[de];ne!==null&&ge!==void 0&&ge.update(ne,J,S||h)}we&&we(k,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),N=null}const Qe=new wr;Qe.setAnimationLoop(Ge),this.setAnimationLoop=function(k){we=k},this.dispose=function(){}}}const Ut=new Cr,ad=new kt;function od(e,n){function t(o,r){o.matrixAutoUpdate===!0&&o.updateMatrix(),r.value.copy(o.matrix)}function i(o,r){r.color.getRGB(o.fogColor.value,Ar(e)),r.isFog?(o.fogNear.value=r.near,o.fogFar.value=r.far):r.isFogExp2&&(o.fogDensity.value=r.density)}function l(o,r,g,v,m){r.isMeshBasicMaterial||r.isMeshLambertMaterial?s(o,r):r.isMeshToonMaterial?(s(o,r),x(o,r)):r.isMeshPhongMaterial?(s(o,r),w(o,r)):r.isMeshStandardMaterial?(s(o,r),M(o,r),r.isMeshPhysicalMaterial&&R(o,r,m)):r.isMeshMatcapMaterial?(s(o,r),N(o,r)):r.isMeshDepthMaterial?s(o,r):r.isMeshDistanceMaterial?(s(o,r),P(o,r)):r.isMeshNormalMaterial?s(o,r):r.isLineBasicMaterial?(h(o,r),r.isLineDashedMaterial&&d(o,r)):r.isPointsMaterial?b(o,r,g,v):r.isSpriteMaterial?S(o,r):r.isShadowMaterial?(o.color.value.copy(r.color),o.opacity.value=r.opacity):r.isShaderMaterial&&(r.uniformsNeedUpdate=!1)}function s(o,r){o.opacity.value=r.opacity,r.color&&o.diffuse.value.copy(r.color),r.emissive&&o.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(o.map.value=r.map,t(r.map,o.mapTransform)),r.alphaMap&&(o.alphaMap.value=r.alphaMap,t(r.alphaMap,o.alphaMapTransform)),r.bumpMap&&(o.bumpMap.value=r.bumpMap,t(r.bumpMap,o.bumpMapTransform),o.bumpScale.value=r.bumpScale,r.side===_t&&(o.bumpScale.value*=-1)),r.normalMap&&(o.normalMap.value=r.normalMap,t(r.normalMap,o.normalMapTransform),o.normalScale.value.copy(r.normalScale),r.side===_t&&o.normalScale.value.negate()),r.displacementMap&&(o.displacementMap.value=r.displacementMap,t(r.displacementMap,o.displacementMapTransform),o.displacementScale.value=r.displacementScale,o.displacementBias.value=r.displacementBias),r.emissiveMap&&(o.emissiveMap.value=r.emissiveMap,t(r.emissiveMap,o.emissiveMapTransform)),r.specularMap&&(o.specularMap.value=r.specularMap,t(r.specularMap,o.specularMapTransform)),r.alphaTest>0&&(o.alphaTest.value=r.alphaTest);const g=n.get(r),v=g.envMap,m=g.envMapRotation;v&&(o.envMap.value=v,Ut.copy(m),Ut.x*=-1,Ut.y*=-1,Ut.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ut.y*=-1,Ut.z*=-1),o.envMapRotation.value.setFromMatrix4(ad.makeRotationFromEuler(Ut)),o.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,o.reflectivity.value=r.reflectivity,o.ior.value=r.ior,o.refractionRatio.value=r.refractionRatio),r.lightMap&&(o.lightMap.value=r.lightMap,o.lightMapIntensity.value=r.lightMapIntensity,t(r.lightMap,o.lightMapTransform)),r.aoMap&&(o.aoMap.value=r.aoMap,o.aoMapIntensity.value=r.aoMapIntensity,t(r.aoMap,o.aoMapTransform))}function h(o,r){o.diffuse.value.copy(r.color),o.opacity.value=r.opacity,r.map&&(o.map.value=r.map,t(r.map,o.mapTransform))}function d(o,r){o.dashSize.value=r.dashSize,o.totalSize.value=r.dashSize+r.gapSize,o.scale.value=r.scale}function b(o,r,g,v){o.diffuse.value.copy(r.color),o.opacity.value=r.opacity,o.size.value=r.size*g,o.scale.value=v*.5,r.map&&(o.map.value=r.map,t(r.map,o.uvTransform)),r.alphaMap&&(o.alphaMap.value=r.alphaMap,t(r.alphaMap,o.alphaMapTransform)),r.alphaTest>0&&(o.alphaTest.value=r.alphaTest)}function S(o,r){o.diffuse.value.copy(r.color),o.opacity.value=r.opacity,o.rotation.value=r.rotation,r.map&&(o.map.value=r.map,t(r.map,o.mapTransform)),r.alphaMap&&(o.alphaMap.value=r.alphaMap,t(r.alphaMap,o.alphaMapTransform)),r.alphaTest>0&&(o.alphaTest.value=r.alphaTest)}function w(o,r){o.specular.value.copy(r.specular),o.shininess.value=Math.max(r.shininess,1e-4)}function x(o,r){r.gradientMap&&(o.gradientMap.value=r.gradientMap)}function M(o,r){o.metalness.value=r.metalness,r.metalnessMap&&(o.metalnessMap.value=r.metalnessMap,t(r.metalnessMap,o.metalnessMapTransform)),o.roughness.value=r.roughness,r.roughnessMap&&(o.roughnessMap.value=r.roughnessMap,t(r.roughnessMap,o.roughnessMapTransform)),r.envMap&&(o.envMapIntensity.value=r.envMapIntensity)}function R(o,r,g){o.ior.value=r.ior,r.sheen>0&&(o.sheenColor.value.copy(r.sheenColor).multiplyScalar(r.sheen),o.sheenRoughness.value=r.sheenRoughness,r.sheenColorMap&&(o.sheenColorMap.value=r.sheenColorMap,t(r.sheenColorMap,o.sheenColorMapTransform)),r.sheenRoughnessMap&&(o.sheenRoughnessMap.value=r.sheenRoughnessMap,t(r.sheenRoughnessMap,o.sheenRoughnessMapTransform))),r.clearcoat>0&&(o.clearcoat.value=r.clearcoat,o.clearcoatRoughness.value=r.clearcoatRoughness,r.clearcoatMap&&(o.clearcoatMap.value=r.clearcoatMap,t(r.clearcoatMap,o.clearcoatMapTransform)),r.clearcoatRoughnessMap&&(o.clearcoatRoughnessMap.value=r.clearcoatRoughnessMap,t(r.clearcoatRoughnessMap,o.clearcoatRoughnessMapTransform)),r.clearcoatNormalMap&&(o.clearcoatNormalMap.value=r.clearcoatNormalMap,t(r.clearcoatNormalMap,o.clearcoatNormalMapTransform),o.clearcoatNormalScale.value.copy(r.clearcoatNormalScale),r.side===_t&&o.clearcoatNormalScale.value.negate())),r.dispersion>0&&(o.dispersion.value=r.dispersion),r.iridescence>0&&(o.iridescence.value=r.iridescence,o.iridescenceIOR.value=r.iridescenceIOR,o.iridescenceThicknessMinimum.value=r.iridescenceThicknessRange[0],o.iridescenceThicknessMaximum.value=r.iridescenceThicknessRange[1],r.iridescenceMap&&(o.iridescenceMap.value=r.iridescenceMap,t(r.iridescenceMap,o.iridescenceMapTransform)),r.iridescenceThicknessMap&&(o.iridescenceThicknessMap.value=r.iridescenceThicknessMap,t(r.iridescenceThicknessMap,o.iridescenceThicknessMapTransform))),r.transmission>0&&(o.transmission.value=r.transmission,o.transmissionSamplerMap.value=g.texture,o.transmissionSamplerSize.value.set(g.width,g.height),r.transmissionMap&&(o.transmissionMap.value=r.transmissionMap,t(r.transmissionMap,o.transmissionMapTransform)),o.thickness.value=r.thickness,r.thicknessMap&&(o.thicknessMap.value=r.thicknessMap,t(r.thicknessMap,o.thicknessMapTransform)),o.attenuationDistance.value=r.attenuationDistance,o.attenuationColor.value.copy(r.attenuationColor)),r.anisotropy>0&&(o.anisotropyVector.value.set(r.anisotropy*Math.cos(r.anisotropyRotation),r.anisotropy*Math.sin(r.anisotropyRotation)),r.anisotropyMap&&(o.anisotropyMap.value=r.anisotropyMap,t(r.anisotropyMap,o.anisotropyMapTransform))),o.specularIntensity.value=r.specularIntensity,o.specularColor.value.copy(r.specularColor),r.specularColorMap&&(o.specularColorMap.value=r.specularColorMap,t(r.specularColorMap,o.specularColorMapTransform)),r.specularIntensityMap&&(o.specularIntensityMap.value=r.specularIntensityMap,t(r.specularIntensityMap,o.specularIntensityMapTransform))}function N(o,r){r.matcap&&(o.matcap.value=r.matcap)}function P(o,r){const g=n.get(r).light;o.referencePosition.value.setFromMatrixPosition(g.matrixWorld),o.nearDistance.value=g.shadow.camera.near,o.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:l}}function sd(e,n,t,i){let l={},s={},h=[];const d=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function b(g,v){const m=v.program;i.uniformBlockBinding(g,m)}function S(g,v){let m=l[g.id];m===void 0&&(N(g),m=w(g),l[g.id]=m,g.addEventListener("dispose",o));const O=v.program;i.updateUBOMapping(g,O);const L=n.render.frame;s[g.id]!==L&&(M(g),s[g.id]=L)}function w(g){const v=x();g.__bindingPointIndex=v;const m=e.createBuffer(),O=g.__size,L=g.usage;return e.bindBuffer(e.UNIFORM_BUFFER,m),e.bufferData(e.UNIFORM_BUFFER,O,L),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,v,m),m}function x(){for(let g=0;g<d;g++)if(h.indexOf(g)===-1)return h.push(g),g;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function M(g){const v=l[g.id],m=g.uniforms,O=g.__cache;e.bindBuffer(e.UNIFORM_BUFFER,v);for(let L=0,D=m.length;L<D;L++){const B=Array.isArray(m[L])?m[L]:[m[L]];for(let p=0,f=B.length;p<f;p++){const C=B[p];if(R(C,L,p,O)===!0){const Y=C.__offset,H=Array.isArray(C.value)?C.value:[C.value];let q=0;for(let Q=0;Q<H.length;Q++){const W=H[Q],j=P(W);typeof W=="number"||typeof W=="boolean"?(C.__data[0]=W,e.bufferSubData(e.UNIFORM_BUFFER,Y+q,C.__data)):W.isMatrix3?(C.__data[0]=W.elements[0],C.__data[1]=W.elements[1],C.__data[2]=W.elements[2],C.__data[3]=0,C.__data[4]=W.elements[3],C.__data[5]=W.elements[4],C.__data[6]=W.elements[5],C.__data[7]=0,C.__data[8]=W.elements[6],C.__data[9]=W.elements[7],C.__data[10]=W.elements[8],C.__data[11]=0):(W.toArray(C.__data,q),q+=j.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,Y,C.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function R(g,v,m,O){const L=g.value,D=v+"_"+m;if(O[D]===void 0)return typeof L=="number"||typeof L=="boolean"?O[D]=L:O[D]=L.clone(),!0;{const B=O[D];if(typeof L=="number"||typeof L=="boolean"){if(B!==L)return O[D]=L,!0}else if(B.equals(L)===!1)return B.copy(L),!0}return!1}function N(g){const v=g.uniforms;let m=0;const O=16;for(let D=0,B=v.length;D<B;D++){const p=Array.isArray(v[D])?v[D]:[v[D]];for(let f=0,C=p.length;f<C;f++){const Y=p[f],H=Array.isArray(Y.value)?Y.value:[Y.value];for(let q=0,Q=H.length;q<Q;q++){const W=H[q],j=P(W),G=m%O,he=G%j.boundary,Se=G+he;m+=he,Se!==0&&O-Se<j.storage&&(m+=O-Se),Y.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=m,m+=j.storage}}}const L=m%O;return L>0&&(m+=O-L),g.__size=m,g.__cache={},this}function P(g){const v={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(v.boundary=4,v.storage=4):g.isVector2?(v.boundary=8,v.storage=8):g.isVector3||g.isColor?(v.boundary=16,v.storage=12):g.isVector4?(v.boundary=16,v.storage=16):g.isMatrix3?(v.boundary=48,v.storage=48):g.isMatrix4?(v.boundary=64,v.storage=64):g.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",g),v}function o(g){const v=g.target;v.removeEventListener("dispose",o);const m=h.indexOf(v.__bindingPointIndex);h.splice(m,1),e.deleteBuffer(l[v.id]),delete l[v.id],delete s[v.id]}function r(){for(const g in l)e.deleteBuffer(l[g]);h=[],l={},s={}}return{bind:b,update:S,dispose:r}}class cd{constructor(n={}){const{canvas:t=Yr(),context:i=null,depth:l=!0,stencil:s=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:b=!0,preserveDrawingBuffer:S=!1,powerPreference:w="default",failIfMajorPerformanceCaveat:x=!1,reverseDepthBuffer:M=!1}=n;this.isWebGLRenderer=!0;let R;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");R=i.getContextAttributes().alpha}else R=h;const N=new Uint32Array(4),P=new Int32Array(4);let o=null,r=null;const g=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Rt,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const m=this;let O=!1;this._outputColorSpace=qr;let L=0,D=0,B=null,p=-1,f=null;const C=new ft,Y=new ft;let H=null;const q=new $e(0);let Q=0,W=t.width,j=t.height,G=1,he=null,Se=null;const we=new ft(0,0,W,j),Ge=new ft(0,0,W,j);let Qe=!1;const k=new dr;let J=!1,de=!1;const ne=new kt,ge=new kt,He=new We,Te=new ft,et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ze=!1;function De(){return B===null?G:1}let _=i;function pt(c,T){return t.getContext(c,T)}try{const c={alpha:!0,depth:l,stencil:s,antialias:d,premultipliedAlpha:b,preserveDrawingBuffer:S,powerPreference:w,failIfMajorPerformanceCaveat:x};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Kr}`),t.addEventListener("webglcontextlost",X,!1),t.addEventListener("webglcontextrestored",oe,!1),t.addEventListener("webglcontextcreationerror",ae,!1),_===null){const T="webgl2";if(_=pt(T,c),_===null)throw pt(T)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(c){throw console.error("THREE.WebGLRenderer: "+c.message),c}let Ne,Ie,me,Ye,pe,u,a,U,z,K,V,ue,ie,Ee,Me,$,ce,xe,Re,le,ye,Le,Xe,E;function re(){Ne=new vl(_),Ne.init(),Le=new ed(_,Ne),Ie=new fl(_,Ne,n,Le),me=new Jf(_,Ne),Ie.reverseDepthBuffer&&M&&me.buffers.depth.setReversed(!0),Ye=new Sl(_),pe=new Hf,u=new jf(_,Ne,me,pe,Ie,Le,Ye),a=new ul(m),U=new _l(m),z=new Co(_),Xe=new cl(_,z),K=new gl(_,z,Ye,Xe),V=new xl(_,K,z,Ye),Re=new Ml(_,Ie,u),$=new dl(pe),ue=new Bf(m,a,U,Ne,Ie,Xe,$),ie=new od(m,pe),Ee=new Vf,Me=new qf(Ne),xe=new sl(m,a,U,me,V,R,b),ce=new Zf(m,V,Ie),E=new sd(_,Ye,Ie,me),le=new ll(_,Ne,Ye),ye=new El(_,Ne,Ye),Ye.programs=ue.programs,m.capabilities=Ie,m.extensions=Ne,m.properties=pe,m.renderLists=Ee,m.shadowMap=ce,m.state=me,m.info=Ye}re();const F=new rd(m,_);this.xr=F,this.getContext=function(){return _},this.getContextAttributes=function(){return _.getContextAttributes()},this.forceContextLoss=function(){const c=Ne.get("WEBGL_lose_context");c&&c.loseContext()},this.forceContextRestore=function(){const c=Ne.get("WEBGL_lose_context");c&&c.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(c){c!==void 0&&(G=c,this.setSize(W,j,!1))},this.getSize=function(c){return c.set(W,j)},this.setSize=function(c,T,I=!0){if(F.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=c,j=T,t.width=Math.floor(c*G),t.height=Math.floor(T*G),I===!0&&(t.style.width=c+"px",t.style.height=T+"px"),this.setViewport(0,0,c,T)},this.getDrawingBufferSize=function(c){return c.set(W*G,j*G).floor()},this.setDrawingBufferSize=function(c,T,I){W=c,j=T,G=I,t.width=Math.floor(c*I),t.height=Math.floor(T*I),this.setViewport(0,0,c,T)},this.getCurrentViewport=function(c){return c.copy(C)},this.getViewport=function(c){return c.copy(we)},this.setViewport=function(c,T,I,y){c.isVector4?we.set(c.x,c.y,c.z,c.w):we.set(c,T,I,y),me.viewport(C.copy(we).multiplyScalar(G).round())},this.getScissor=function(c){return c.copy(Ge)},this.setScissor=function(c,T,I,y){c.isVector4?Ge.set(c.x,c.y,c.z,c.w):Ge.set(c,T,I,y),me.scissor(Y.copy(Ge).multiplyScalar(G).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(c){me.setScissorTest(Qe=c)},this.setOpaqueSort=function(c){he=c},this.setTransparentSort=function(c){Se=c},this.getClearColor=function(c){return c.copy(xe.getClearColor())},this.setClearColor=function(){xe.setClearColor(...arguments)},this.getClearAlpha=function(){return xe.getClearAlpha()},this.setClearAlpha=function(){xe.setClearAlpha(...arguments)},this.clear=function(c=!0,T=!0,I=!0){let y=0;if(c){let A=!1;if(B!==null){const Z=B.texture.format;A=Z===xr||Z===Mr||Z===Sr}if(A){const Z=B.texture.type,te=Z===Nt||Z===en||Z===_n||Z===jt||Z===_r||Z===vr,se=xe.getClearColor(),fe=xe.getClearAlpha(),Ce=se.r,Ae=se.g,_e=se.b;te?(N[0]=Ce,N[1]=Ae,N[2]=_e,N[3]=fe,_.clearBufferuiv(_.COLOR,0,N)):(P[0]=Ce,P[1]=Ae,P[2]=_e,P[3]=fe,_.clearBufferiv(_.COLOR,0,P))}else y|=_.COLOR_BUFFER_BIT}T&&(y|=_.DEPTH_BUFFER_BIT),I&&(y|=_.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),_.clear(y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",X,!1),t.removeEventListener("webglcontextrestored",oe,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),xe.dispose(),Ee.dispose(),Me.dispose(),pe.dispose(),a.dispose(),U.dispose(),V.dispose(),Xe.dispose(),E.dispose(),ue.dispose(),F.dispose(),F.removeEventListener("sessionstart",Jn),F.removeEventListener("sessionend",jn),bt.stop()};function X(c){c.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),O=!0}function oe(){console.log("THREE.WebGLRenderer: Context Restored."),O=!1;const c=Ye.autoReset,T=ce.enabled,I=ce.autoUpdate,y=ce.needsUpdate,A=ce.type;re(),Ye.autoReset=c,ce.enabled=T,ce.autoUpdate=I,ce.needsUpdate=y,ce.type=A}function ae(c){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",c.statusMessage)}function Pe(c){const T=c.target;T.removeEventListener("dispose",Pe),Je(T)}function Je(c){ot(c),pe.remove(c)}function ot(c){const T=pe.get(c).programs;T!==void 0&&(T.forEach(function(I){ue.releaseProgram(I)}),c.isShaderMaterial&&ue.releaseShaderCache(c))}this.renderBufferDirect=function(c,T,I,y,A,Z){T===null&&(T=et);const te=A.isMesh&&A.matrixWorld.determinant()<0,se=Fr(c,T,I,y,A);me.setMaterial(y,te);let fe=I.index,Ce=1;if(y.wireframe===!0){if(fe=K.getWireframeAttribute(I),fe===void 0)return;Ce=2}const Ae=I.drawRange,_e=I.attributes.position;let Fe=Ae.start*Ce,Ve=(Ae.start+Ae.count)*Ce;Z!==null&&(Fe=Math.max(Fe,Z.start*Ce),Ve=Math.min(Ve,(Z.start+Z.count)*Ce)),fe!==null?(Fe=Math.max(Fe,0),Ve=Math.min(Ve,fe.count)):_e!=null&&(Fe=Math.max(Fe,0),Ve=Math.min(Ve,_e.count));const tt=Ve-Fe;if(tt<0||tt===1/0)return;Xe.setup(A,y,se,I,fe);let je,Oe=le;if(fe!==null&&(je=z.get(fe),Oe=ye,Oe.setIndex(je)),A.isMesh)y.wireframe===!0?(me.setLineWidth(y.wireframeLinewidth*De()),Oe.setMode(_.LINES)):Oe.setMode(_.TRIANGLES);else if(A.isLine){let ve=y.linewidth;ve===void 0&&(ve=1),me.setLineWidth(ve*De()),A.isLineSegments?Oe.setMode(_.LINES):A.isLineLoop?Oe.setMode(_.LINE_LOOP):Oe.setMode(_.LINE_STRIP)}else A.isPoints?Oe.setMode(_.POINTS):A.isSprite&&Oe.setMode(_.TRIANGLES);if(A.isBatchedMesh)if(A._multiDrawInstances!==null)fn("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Oe.renderMultiDrawInstances(A._multiDrawStarts,A._multiDrawCounts,A._multiDrawCount,A._multiDrawInstances);else if(Ne.get("WEBGL_multi_draw"))Oe.renderMultiDraw(A._multiDrawStarts,A._multiDrawCounts,A._multiDrawCount);else{const ve=A._multiDrawStarts,at=A._multiDrawCounts,ze=A._multiDrawCount,gt=fe?z.get(fe).bytesPerElement:1,Ft=pe.get(y).currentProgram.getUniforms();for(let ut=0;ut<ze;ut++)Ft.setValue(_,"_gl_DrawID",ut),Oe.render(ve[ut]/gt,at[ut])}else if(A.isInstancedMesh)Oe.renderInstances(Fe,tt,A.count);else if(I.isInstancedBufferGeometry){const ve=I._maxInstanceCount!==void 0?I._maxInstanceCount:1/0,at=Math.min(I.instanceCount,ve);Oe.renderInstances(Fe,tt,at)}else Oe.render(Fe,tt)};function ke(c,T,I){c.transparent===!0&&c.side===xt&&c.forceSinglePass===!1?(c.side=_t,c.needsUpdate=!0,rn(c,T,I),c.side=Jt,c.needsUpdate=!0,rn(c,T,I),c.side=xt):rn(c,T,I)}this.compile=function(c,T,I=null){I===null&&(I=c),r=Me.get(I),r.init(T),v.push(r),I.traverseVisible(function(A){A.isLight&&A.layers.test(T.layers)&&(r.pushLight(A),A.castShadow&&r.pushShadow(A))}),c!==I&&c.traverseVisible(function(A){A.isLight&&A.layers.test(T.layers)&&(r.pushLight(A),A.castShadow&&r.pushShadow(A))}),r.setupLights();const y=new Set;return c.traverse(function(A){if(!(A.isMesh||A.isPoints||A.isLine||A.isSprite))return;const Z=A.material;if(Z)if(Array.isArray(Z))for(let te=0;te<Z.length;te++){const se=Z[te];ke(se,I,A),y.add(se)}else ke(Z,I,A),y.add(Z)}),r=v.pop(),y},this.compileAsync=function(c,T,I=null){const y=this.compile(c,T,I);return new Promise(A=>{function Z(){if(y.forEach(function(te){pe.get(te).currentProgram.isReady()&&y.delete(te)}),y.size===0){A(c);return}setTimeout(Z,10)}Ne.get("KHR_parallel_shader_compile")!==null?Z():setTimeout(Z,10)})};let vt=null;function St(c){vt&&vt(c)}function Jn(){bt.stop()}function jn(){bt.start()}const bt=new wr;bt.setAnimationLoop(St),typeof self<"u"&&bt.setContext(self),this.setAnimationLoop=function(c){vt=c,F.setAnimationLoop(c),c===null?bt.stop():bt.start()},F.addEventListener("sessionstart",Jn),F.addEventListener("sessionend",jn),this.render=function(c,T){if(T!==void 0&&T.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;if(c.matrixWorldAutoUpdate===!0&&c.updateMatrixWorld(),T.parent===null&&T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),F.enabled===!0&&F.isPresenting===!0&&(F.cameraAutoUpdate===!0&&F.updateCamera(T),T=F.getCamera()),c.isScene===!0&&c.onBeforeRender(m,c,T,B),r=Me.get(c,v.length),r.init(T),v.push(r),ge.multiplyMatrices(T.projectionMatrix,T.matrixWorldInverse),k.setFromProjectionMatrix(ge),de=this.localClippingEnabled,J=$.init(this.clippingPlanes,de),o=Ee.get(c,g.length),o.init(),g.push(o),F.enabled===!0&&F.isPresenting===!0){const Z=m.xr.getDepthSensingMesh();Z!==null&&xn(Z,T,-1/0,m.sortObjects)}xn(c,T,0,m.sortObjects),o.finish(),m.sortObjects===!0&&o.sort(he,Se),Ze=F.enabled===!1||F.isPresenting===!1||F.hasDepthSensing()===!1,Ze&&xe.addToRenderList(o,c),this.info.render.frame++,J===!0&&$.beginShadows();const I=r.state.shadowsArray;ce.render(I,c,T),J===!0&&$.endShadows(),this.info.autoReset===!0&&this.info.reset();const y=o.opaque,A=o.transmissive;if(r.setupLights(),T.isArrayCamera){const Z=T.cameras;if(A.length>0)for(let te=0,se=Z.length;te<se;te++){const fe=Z[te];ti(y,A,c,fe)}Ze&&xe.render(c);for(let te=0,se=Z.length;te<se;te++){const fe=Z[te];ei(o,c,fe,fe.viewport)}}else A.length>0&&ti(y,A,c,T),Ze&&xe.render(c),ei(o,c,T);B!==null&&D===0&&(u.updateMultisampleRenderTarget(B),u.updateRenderTargetMipmap(B)),c.isScene===!0&&c.onAfterRender(m,c,T),Xe.resetDefaultState(),p=-1,f=null,v.pop(),v.length>0?(r=v[v.length-1],J===!0&&$.setGlobalState(m.clippingPlanes,r.state.camera)):r=null,g.pop(),g.length>0?o=g[g.length-1]:o=null};function xn(c,T,I,y){if(c.visible===!1)return;if(c.layers.test(T.layers)){if(c.isGroup)I=c.renderOrder;else if(c.isLOD)c.autoUpdate===!0&&c.update(T);else if(c.isLight)r.pushLight(c),c.castShadow&&r.pushShadow(c);else if(c.isSprite){if(!c.frustumCulled||k.intersectsSprite(c)){y&&Te.setFromMatrixPosition(c.matrixWorld).applyMatrix4(ge);const te=V.update(c),se=c.material;se.visible&&o.push(c,te,se,I,Te.z,null)}}else if((c.isMesh||c.isLine||c.isPoints)&&(!c.frustumCulled||k.intersectsObject(c))){const te=V.update(c),se=c.material;if(y&&(c.boundingSphere!==void 0?(c.boundingSphere===null&&c.computeBoundingSphere(),Te.copy(c.boundingSphere.center)):(te.boundingSphere===null&&te.computeBoundingSphere(),Te.copy(te.boundingSphere.center)),Te.applyMatrix4(c.matrixWorld).applyMatrix4(ge)),Array.isArray(se)){const fe=te.groups;for(let Ce=0,Ae=fe.length;Ce<Ae;Ce++){const _e=fe[Ce],Fe=se[_e.materialIndex];Fe&&Fe.visible&&o.push(c,te,Fe,I,Te.z,_e)}}else se.visible&&o.push(c,te,se,I,Te.z,null)}}const Z=c.children;for(let te=0,se=Z.length;te<se;te++)xn(Z[te],T,I,y)}function ei(c,T,I,y){const A=c.opaque,Z=c.transmissive,te=c.transparent;r.setupLightsView(I),J===!0&&$.setGlobalState(m.clippingPlanes,I),y&&me.viewport(C.copy(y)),A.length>0&&nn(A,T,I),Z.length>0&&nn(Z,T,I),te.length>0&&nn(te,T,I),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function ti(c,T,I,y){if((I.isScene===!0?I.overrideMaterial:null)!==null)return;r.state.transmissionRenderTarget[y.id]===void 0&&(r.state.transmissionRenderTarget[y.id]=new Wt(1,1,{generateMipmaps:!0,type:Ne.has("EXT_color_buffer_half_float")||Ne.has("EXT_color_buffer_float")?gn:Nt,minFilter:$t,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:nt.workingColorSpace}));const Z=r.state.transmissionRenderTarget[y.id],te=y.viewport||C;Z.setSize(te.z*m.transmissionResolutionScale,te.w*m.transmissionResolutionScale);const se=m.getRenderTarget();m.setRenderTarget(Z),m.getClearColor(q),Q=m.getClearAlpha(),Q<1&&m.setClearColor(16777215,.5),m.clear(),Ze&&xe.render(I);const fe=m.toneMapping;m.toneMapping=Rt;const Ce=y.viewport;if(y.viewport!==void 0&&(y.viewport=void 0),r.setupLightsView(y),J===!0&&$.setGlobalState(m.clippingPlanes,y),nn(c,I,y),u.updateMultisampleRenderTarget(Z),u.updateRenderTargetMipmap(Z),Ne.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let _e=0,Fe=T.length;_e<Fe;_e++){const Ve=T[_e],tt=Ve.object,je=Ve.geometry,Oe=Ve.material,ve=Ve.group;if(Oe.side===xt&&tt.layers.test(y.layers)){const at=Oe.side;Oe.side=_t,Oe.needsUpdate=!0,ni(tt,I,y,je,Oe,ve),Oe.side=at,Oe.needsUpdate=!0,Ae=!0}}Ae===!0&&(u.updateMultisampleRenderTarget(Z),u.updateRenderTargetMipmap(Z))}m.setRenderTarget(se),m.setClearColor(q,Q),Ce!==void 0&&(y.viewport=Ce),m.toneMapping=fe}function nn(c,T,I){const y=T.isScene===!0?T.overrideMaterial:null;for(let A=0,Z=c.length;A<Z;A++){const te=c[A],se=te.object,fe=te.geometry,Ce=te.group;let Ae=te.material;Ae.allowOverride===!0&&y!==null&&(Ae=y),se.layers.test(I.layers)&&ni(se,T,I,fe,Ae,Ce)}}function ni(c,T,I,y,A,Z){c.onBeforeRender(m,T,I,y,A,Z),c.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,c.matrixWorld),c.normalMatrix.getNormalMatrix(c.modelViewMatrix),A.onBeforeRender(m,T,I,y,c,Z),A.transparent===!0&&A.side===xt&&A.forceSinglePass===!1?(A.side=_t,A.needsUpdate=!0,m.renderBufferDirect(I,T,y,A,c,Z),A.side=Jt,A.needsUpdate=!0,m.renderBufferDirect(I,T,y,A,c,Z),A.side=xt):m.renderBufferDirect(I,T,y,A,c,Z),c.onAfterRender(m,T,I,y,A,Z)}function rn(c,T,I){T.isScene!==!0&&(T=et);const y=pe.get(c),A=r.state.lights,Z=r.state.shadowsArray,te=A.state.version,se=ue.getParameters(c,A.state,Z,T,I),fe=ue.getProgramCacheKey(se);let Ce=y.programs;y.environment=c.isMeshStandardMaterial?T.environment:null,y.fog=T.fog,y.envMap=(c.isMeshStandardMaterial?U:a).get(c.envMap||y.environment),y.envMapRotation=y.environment!==null&&c.envMap===null?T.environmentRotation:c.envMapRotation,Ce===void 0&&(c.addEventListener("dispose",Pe),Ce=new Map,y.programs=Ce);let Ae=Ce.get(fe);if(Ae!==void 0){if(y.currentProgram===Ae&&y.lightsStateVersion===te)return ri(c,se),Ae}else se.uniforms=ue.getUniforms(c),c.onBeforeCompile(se,m),Ae=ue.acquireProgram(se,fe),Ce.set(fe,Ae),y.uniforms=se.uniforms;const _e=y.uniforms;return(!c.isShaderMaterial&&!c.isRawShaderMaterial||c.clipping===!0)&&(_e.clippingPlanes=$.uniform),ri(c,se),y.needsLights=Br(c),y.lightsStateVersion=te,y.needsLights&&(_e.ambientLightColor.value=A.state.ambient,_e.lightProbe.value=A.state.probe,_e.directionalLights.value=A.state.directional,_e.directionalLightShadows.value=A.state.directionalShadow,_e.spotLights.value=A.state.spot,_e.spotLightShadows.value=A.state.spotShadow,_e.rectAreaLights.value=A.state.rectArea,_e.ltc_1.value=A.state.rectAreaLTC1,_e.ltc_2.value=A.state.rectAreaLTC2,_e.pointLights.value=A.state.point,_e.pointLightShadows.value=A.state.pointShadow,_e.hemisphereLights.value=A.state.hemi,_e.directionalShadowMap.value=A.state.directionalShadowMap,_e.directionalShadowMatrix.value=A.state.directionalShadowMatrix,_e.spotShadowMap.value=A.state.spotShadowMap,_e.spotLightMatrix.value=A.state.spotLightMatrix,_e.spotLightMap.value=A.state.spotLightMap,_e.pointShadowMap.value=A.state.pointShadowMap,_e.pointShadowMatrix.value=A.state.pointShadowMatrix),y.currentProgram=Ae,y.uniformsList=null,Ae}function ii(c){if(c.uniformsList===null){const T=c.currentProgram.getUniforms();c.uniformsList=pn.seqWithValue(T.seq,c.uniforms)}return c.uniformsList}function ri(c,T){const I=pe.get(c);I.outputColorSpace=T.outputColorSpace,I.batching=T.batching,I.batchingColor=T.batchingColor,I.instancing=T.instancing,I.instancingColor=T.instancingColor,I.instancingMorph=T.instancingMorph,I.skinning=T.skinning,I.morphTargets=T.morphTargets,I.morphNormals=T.morphNormals,I.morphColors=T.morphColors,I.morphTargetsCount=T.morphTargetsCount,I.numClippingPlanes=T.numClippingPlanes,I.numIntersection=T.numClipIntersection,I.vertexAlphas=T.vertexAlphas,I.vertexTangents=T.vertexTangents,I.toneMapping=T.toneMapping}function Fr(c,T,I,y,A){T.isScene!==!0&&(T=et),u.resetTextureUnits();const Z=T.fog,te=y.isMeshStandardMaterial?T.environment:null,se=B===null?m.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:En,fe=(y.isMeshStandardMaterial?U:a).get(y.envMap||te),Ce=y.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,Ae=!!I.attributes.tangent&&(!!y.normalMap||y.anisotropy>0),_e=!!I.morphAttributes.position,Fe=!!I.morphAttributes.normal,Ve=!!I.morphAttributes.color;let tt=Rt;y.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(tt=m.toneMapping);const je=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,Oe=je!==void 0?je.length:0,ve=pe.get(y),at=r.state.lights;if(J===!0&&(de===!0||c!==f)){const st=c===f&&y.id===p;$.setState(y,c,st)}let ze=!1;y.version===ve.__version?(ve.needsLights&&ve.lightsStateVersion!==at.state.version||ve.outputColorSpace!==se||A.isBatchedMesh&&ve.batching===!1||!A.isBatchedMesh&&ve.batching===!0||A.isBatchedMesh&&ve.batchingColor===!0&&A.colorTexture===null||A.isBatchedMesh&&ve.batchingColor===!1&&A.colorTexture!==null||A.isInstancedMesh&&ve.instancing===!1||!A.isInstancedMesh&&ve.instancing===!0||A.isSkinnedMesh&&ve.skinning===!1||!A.isSkinnedMesh&&ve.skinning===!0||A.isInstancedMesh&&ve.instancingColor===!0&&A.instanceColor===null||A.isInstancedMesh&&ve.instancingColor===!1&&A.instanceColor!==null||A.isInstancedMesh&&ve.instancingMorph===!0&&A.morphTexture===null||A.isInstancedMesh&&ve.instancingMorph===!1&&A.morphTexture!==null||ve.envMap!==fe||y.fog===!0&&ve.fog!==Z||ve.numClippingPlanes!==void 0&&(ve.numClippingPlanes!==$.numPlanes||ve.numIntersection!==$.numIntersection)||ve.vertexAlphas!==Ce||ve.vertexTangents!==Ae||ve.morphTargets!==_e||ve.morphNormals!==Fe||ve.morphColors!==Ve||ve.toneMapping!==tt||ve.morphTargetsCount!==Oe)&&(ze=!0):(ze=!0,ve.__version=y.version);let gt=ve.currentProgram;ze===!0&&(gt=rn(y,T,A));let Ft=!1,ut=!1,qt=!1;const Ke=gt.getUniforms(),ht=ve.uniforms;if(me.useProgram(gt.program)&&(Ft=!0,ut=!0,qt=!0),y.id!==p&&(p=y.id,ut=!0),Ft||f!==c){me.buffers.depth.getReversed()?(ne.copy(c.projectionMatrix),$r(ne),Zr(ne),Ke.setValue(_,"projectionMatrix",ne)):Ke.setValue(_,"projectionMatrix",c.projectionMatrix),Ke.setValue(_,"viewMatrix",c.matrixWorldInverse);const ct=Ke.map.cameraPosition;ct!==void 0&&ct.setValue(_,He.setFromMatrixPosition(c.matrixWorld)),Ie.logarithmicDepthBuffer&&Ke.setValue(_,"logDepthBufFC",2/(Math.log(c.far+1)/Math.LN2)),(y.isMeshPhongMaterial||y.isMeshToonMaterial||y.isMeshLambertMaterial||y.isMeshBasicMaterial||y.isMeshStandardMaterial||y.isShaderMaterial)&&Ke.setValue(_,"isOrthographic",c.isOrthographicCamera===!0),f!==c&&(f=c,ut=!0,qt=!0)}if(A.isSkinnedMesh){Ke.setOptional(_,A,"bindMatrix"),Ke.setOptional(_,A,"bindMatrixInverse");const st=A.skeleton;st&&(st.boneTexture===null&&st.computeBoneTexture(),Ke.setValue(_,"boneTexture",st.boneTexture,u))}A.isBatchedMesh&&(Ke.setOptional(_,A,"batchingTexture"),Ke.setValue(_,"batchingTexture",A._matricesTexture,u),Ke.setOptional(_,A,"batchingIdTexture"),Ke.setValue(_,"batchingIdTexture",A._indirectTexture,u),Ke.setOptional(_,A,"batchingColorTexture"),A._colorsTexture!==null&&Ke.setValue(_,"batchingColorTexture",A._colorsTexture,u));const mt=I.morphAttributes;if((mt.position!==void 0||mt.normal!==void 0||mt.color!==void 0)&&Re.update(A,I,gt),(ut||ve.receiveShadow!==A.receiveShadow)&&(ve.receiveShadow=A.receiveShadow,Ke.setValue(_,"receiveShadow",A.receiveShadow)),y.isMeshGouraudMaterial&&y.envMap!==null&&(ht.envMap.value=fe,ht.flipEnvMap.value=fe.isCubeTexture&&fe.isRenderTargetTexture===!1?-1:1),y.isMeshStandardMaterial&&y.envMap===null&&T.environment!==null&&(ht.envMapIntensity.value=T.environmentIntensity),ut&&(Ke.setValue(_,"toneMappingExposure",m.toneMappingExposure),ve.needsLights&&Or(ht,qt),Z&&y.fog===!0&&ie.refreshFogUniforms(ht,Z),ie.refreshMaterialUniforms(ht,y,G,j,r.state.transmissionRenderTarget[c.id]),pn.upload(_,ii(ve),ht,u)),y.isShaderMaterial&&y.uniformsNeedUpdate===!0&&(pn.upload(_,ii(ve),ht,u),y.uniformsNeedUpdate=!1),y.isSpriteMaterial&&Ke.setValue(_,"center",A.center),Ke.setValue(_,"modelViewMatrix",A.modelViewMatrix),Ke.setValue(_,"normalMatrix",A.normalMatrix),Ke.setValue(_,"modelMatrix",A.matrixWorld),y.isShaderMaterial||y.isRawShaderMaterial){const st=y.uniformsGroups;for(let ct=0,Tn=st.length;ct<Tn;ct++){const Pt=st[ct];E.update(Pt,gt),E.bind(Pt,gt)}}return gt}function Or(c,T){c.ambientLightColor.needsUpdate=T,c.lightProbe.needsUpdate=T,c.directionalLights.needsUpdate=T,c.directionalLightShadows.needsUpdate=T,c.pointLights.needsUpdate=T,c.pointLightShadows.needsUpdate=T,c.spotLights.needsUpdate=T,c.spotLightShadows.needsUpdate=T,c.rectAreaLights.needsUpdate=T,c.hemisphereLights.needsUpdate=T}function Br(c){return c.isMeshLambertMaterial||c.isMeshToonMaterial||c.isMeshPhongMaterial||c.isMeshStandardMaterial||c.isShadowMaterial||c.isShaderMaterial&&c.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(c,T,I){const y=pe.get(c);y.__autoAllocateDepthBuffer=c.resolveDepthBuffer===!1,y.__autoAllocateDepthBuffer===!1&&(y.__useRenderToTexture=!1),pe.get(c.texture).__webglTexture=T,pe.get(c.depthTexture).__webglTexture=y.__autoAllocateDepthBuffer?void 0:I,y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(c,T){const I=pe.get(c);I.__webglFramebuffer=T,I.__useDefaultFramebuffer=T===void 0};const Hr=_.createFramebuffer();this.setRenderTarget=function(c,T=0,I=0){B=c,L=T,D=I;let y=!0,A=null,Z=!1,te=!1;if(c){const fe=pe.get(c);if(fe.__useDefaultFramebuffer!==void 0)me.bindFramebuffer(_.FRAMEBUFFER,null),y=!1;else if(fe.__webglFramebuffer===void 0)u.setupRenderTarget(c);else if(fe.__hasExternalTextures)u.rebindTextures(c,pe.get(c.texture).__webglTexture,pe.get(c.depthTexture).__webglTexture);else if(c.depthBuffer){const _e=c.depthTexture;if(fe.__boundDepthTexture!==_e){if(_e!==null&&pe.has(_e)&&(c.width!==_e.image.width||c.height!==_e.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");u.setupDepthRenderbuffer(c)}}const Ce=c.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(te=!0);const Ae=pe.get(c).__webglFramebuffer;c.isWebGLCubeRenderTarget?(Array.isArray(Ae[T])?A=Ae[T][I]:A=Ae[T],Z=!0):c.samples>0&&u.useMultisampledRTT(c)===!1?A=pe.get(c).__webglMultisampledFramebuffer:Array.isArray(Ae)?A=Ae[I]:A=Ae,C.copy(c.viewport),Y.copy(c.scissor),H=c.scissorTest}else C.copy(we).multiplyScalar(G).floor(),Y.copy(Ge).multiplyScalar(G).floor(),H=Qe;if(I!==0&&(A=Hr),me.bindFramebuffer(_.FRAMEBUFFER,A)&&y&&me.drawBuffers(c,A),me.viewport(C),me.scissor(Y),me.setScissorTest(H),Z){const fe=pe.get(c.texture);_.framebufferTexture2D(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_CUBE_MAP_POSITIVE_X+T,fe.__webglTexture,I)}else if(te){const fe=pe.get(c.texture),Ce=T;_.framebufferTextureLayer(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,fe.__webglTexture,I,Ce)}else if(c!==null&&I!==0){const fe=pe.get(c.texture);_.framebufferTexture2D(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,fe.__webglTexture,I)}p=-1},this.readRenderTargetPixels=function(c,T,I,y,A,Z,te){if(!(c&&c.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let se=pe.get(c).__webglFramebuffer;if(c.isWebGLCubeRenderTarget&&te!==void 0&&(se=se[te]),se){me.bindFramebuffer(_.FRAMEBUFFER,se);try{const fe=c.texture,Ce=fe.format,Ae=fe.type;if(!Ie.textureFormatReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ie.textureTypeReadable(Ae)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}T>=0&&T<=c.width-y&&I>=0&&I<=c.height-A&&_.readPixels(T,I,y,A,Le.convert(Ce),Le.convert(Ae),Z)}finally{const fe=B!==null?pe.get(B).__webglFramebuffer:null;me.bindFramebuffer(_.FRAMEBUFFER,fe)}}},this.readRenderTargetPixelsAsync=async function(c,T,I,y,A,Z,te){if(!(c&&c.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let se=pe.get(c).__webglFramebuffer;if(c.isWebGLCubeRenderTarget&&te!==void 0&&(se=se[te]),se)if(T>=0&&T<=c.width-y&&I>=0&&I<=c.height-A){me.bindFramebuffer(_.FRAMEBUFFER,se);const fe=c.texture,Ce=fe.format,Ae=fe.type;if(!Ie.textureFormatReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ie.textureTypeReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const _e=_.createBuffer();_.bindBuffer(_.PIXEL_PACK_BUFFER,_e),_.bufferData(_.PIXEL_PACK_BUFFER,Z.byteLength,_.STREAM_READ),_.readPixels(T,I,y,A,Le.convert(Ce),Le.convert(Ae),0);const Fe=B!==null?pe.get(B).__webglFramebuffer:null;me.bindFramebuffer(_.FRAMEBUFFER,Fe);const Ve=_.fenceSync(_.SYNC_GPU_COMMANDS_COMPLETE,0);return _.flush(),await Qr(_,Ve,4),_.bindBuffer(_.PIXEL_PACK_BUFFER,_e),_.getBufferSubData(_.PIXEL_PACK_BUFFER,0,Z),_.deleteBuffer(_e),_.deleteSync(Ve),Z}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(c,T=null,I=0){const y=Math.pow(2,-I),A=Math.floor(c.image.width*y),Z=Math.floor(c.image.height*y),te=T!==null?T.x:0,se=T!==null?T.y:0;u.setTexture2D(c,0),_.copyTexSubImage2D(_.TEXTURE_2D,I,0,0,te,se,A,Z),me.unbindTexture()};const Gr=_.createFramebuffer(),Vr=_.createFramebuffer();this.copyTextureToTexture=function(c,T,I=null,y=null,A=0,Z=null){Z===null&&(A!==0?(fn("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Z=A,A=0):Z=0);let te,se,fe,Ce,Ae,_e,Fe,Ve,tt;const je=c.isCompressedTexture?c.mipmaps[Z]:c.image;if(I!==null)te=I.max.x-I.min.x,se=I.max.y-I.min.y,fe=I.isBox3?I.max.z-I.min.z:1,Ce=I.min.x,Ae=I.min.y,_e=I.isBox3?I.min.z:0;else{const mt=Math.pow(2,-A);te=Math.floor(je.width*mt),se=Math.floor(je.height*mt),c.isDataArrayTexture?fe=je.depth:c.isData3DTexture?fe=Math.floor(je.depth*mt):fe=1,Ce=0,Ae=0,_e=0}y!==null?(Fe=y.x,Ve=y.y,tt=y.z):(Fe=0,Ve=0,tt=0);const Oe=Le.convert(T.format),ve=Le.convert(T.type);let at;T.isData3DTexture?(u.setTexture3D(T,0),at=_.TEXTURE_3D):T.isDataArrayTexture||T.isCompressedArrayTexture?(u.setTexture2DArray(T,0),at=_.TEXTURE_2D_ARRAY):(u.setTexture2D(T,0),at=_.TEXTURE_2D),_.pixelStorei(_.UNPACK_FLIP_Y_WEBGL,T.flipY),_.pixelStorei(_.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),_.pixelStorei(_.UNPACK_ALIGNMENT,T.unpackAlignment);const ze=_.getParameter(_.UNPACK_ROW_LENGTH),gt=_.getParameter(_.UNPACK_IMAGE_HEIGHT),Ft=_.getParameter(_.UNPACK_SKIP_PIXELS),ut=_.getParameter(_.UNPACK_SKIP_ROWS),qt=_.getParameter(_.UNPACK_SKIP_IMAGES);_.pixelStorei(_.UNPACK_ROW_LENGTH,je.width),_.pixelStorei(_.UNPACK_IMAGE_HEIGHT,je.height),_.pixelStorei(_.UNPACK_SKIP_PIXELS,Ce),_.pixelStorei(_.UNPACK_SKIP_ROWS,Ae),_.pixelStorei(_.UNPACK_SKIP_IMAGES,_e);const Ke=c.isDataArrayTexture||c.isData3DTexture,ht=T.isDataArrayTexture||T.isData3DTexture;if(c.isDepthTexture){const mt=pe.get(c),st=pe.get(T),ct=pe.get(mt.__renderTarget),Tn=pe.get(st.__renderTarget);me.bindFramebuffer(_.READ_FRAMEBUFFER,ct.__webglFramebuffer),me.bindFramebuffer(_.DRAW_FRAMEBUFFER,Tn.__webglFramebuffer);for(let Pt=0;Pt<fe;Pt++)Ke&&(_.framebufferTextureLayer(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,pe.get(c).__webglTexture,A,_e+Pt),_.framebufferTextureLayer(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,pe.get(T).__webglTexture,Z,tt+Pt)),_.blitFramebuffer(Ce,Ae,te,se,Fe,Ve,te,se,_.DEPTH_BUFFER_BIT,_.NEAREST);me.bindFramebuffer(_.READ_FRAMEBUFFER,null),me.bindFramebuffer(_.DRAW_FRAMEBUFFER,null)}else if(A!==0||c.isRenderTargetTexture||pe.has(c)){const mt=pe.get(c),st=pe.get(T);me.bindFramebuffer(_.READ_FRAMEBUFFER,Gr),me.bindFramebuffer(_.DRAW_FRAMEBUFFER,Vr);for(let ct=0;ct<fe;ct++)Ke?_.framebufferTextureLayer(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,mt.__webglTexture,A,_e+ct):_.framebufferTexture2D(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,mt.__webglTexture,A),ht?_.framebufferTextureLayer(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,st.__webglTexture,Z,tt+ct):_.framebufferTexture2D(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,st.__webglTexture,Z),A!==0?_.blitFramebuffer(Ce,Ae,te,se,Fe,Ve,te,se,_.COLOR_BUFFER_BIT,_.NEAREST):ht?_.copyTexSubImage3D(at,Z,Fe,Ve,tt+ct,Ce,Ae,te,se):_.copyTexSubImage2D(at,Z,Fe,Ve,Ce,Ae,te,se);me.bindFramebuffer(_.READ_FRAMEBUFFER,null),me.bindFramebuffer(_.DRAW_FRAMEBUFFER,null)}else ht?c.isDataTexture||c.isData3DTexture?_.texSubImage3D(at,Z,Fe,Ve,tt,te,se,fe,Oe,ve,je.data):T.isCompressedArrayTexture?_.compressedTexSubImage3D(at,Z,Fe,Ve,tt,te,se,fe,Oe,je.data):_.texSubImage3D(at,Z,Fe,Ve,tt,te,se,fe,Oe,ve,je):c.isDataTexture?_.texSubImage2D(_.TEXTURE_2D,Z,Fe,Ve,te,se,Oe,ve,je.data):c.isCompressedTexture?_.compressedTexSubImage2D(_.TEXTURE_2D,Z,Fe,Ve,je.width,je.height,Oe,je.data):_.texSubImage2D(_.TEXTURE_2D,Z,Fe,Ve,te,se,Oe,ve,je);_.pixelStorei(_.UNPACK_ROW_LENGTH,ze),_.pixelStorei(_.UNPACK_IMAGE_HEIGHT,gt),_.pixelStorei(_.UNPACK_SKIP_PIXELS,Ft),_.pixelStorei(_.UNPACK_SKIP_ROWS,ut),_.pixelStorei(_.UNPACK_SKIP_IMAGES,qt),Z===0&&T.generateMipmaps&&_.generateMipmap(at),me.unbindTexture()},this.copyTextureToTexture3D=function(c,T,I=null,y=null,A=0){return fn('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(c,T,I,y,A)},this.initRenderTarget=function(c){pe.get(c).__webglFramebuffer===void 0&&u.setupRenderTarget(c)},this.initTexture=function(c){c.isCubeTexture?u.setTextureCube(c,0):c.isData3DTexture?u.setTexture3D(c,0):c.isDataArrayTexture||c.isCompressedArrayTexture?u.setTexture2DArray(c,0):u.setTexture2D(c,0),me.unbindTexture()},this.resetState=function(){L=0,D=0,B=null,me.reset(),Xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(n),t.unpackColorSpace=nt._getUnpackColorSpace()}}const ld=`
varying vec2 vUv;
uniform float uTime;
uniform float mouse;
uniform float uEnableWaves;

void main() {
    vUv = uv;
    float time = uTime * 5.;

    float waveFactor = uEnableWaves;

    vec3 transformed = position;

    transformed.x += sin(time + position.y) * 0.5 * waveFactor;
    transformed.y += cos(time + position.z) * 0.15 * waveFactor;
    transformed.z += sin(time + position.x) * waveFactor;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`,fd=`
varying vec2 vUv;
uniform float mouse;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
    float time = uTime;
    vec2 pos = vUv;

    float move = sin(time + mouse) * 0.01;
    float r = texture2D(uTexture, pos + cos(time * 2. - time + pos.x) * .01).r;
    float g = texture2D(uTexture, pos + tan(time * .5 + pos.x - time) * .01).g;
    float b = texture2D(uTexture, pos - cos(time * 2. + time + pos.y) * .01).b;
    float a = texture2D(uTexture, pos).a;
    gl_FragColor = vec4(r, g, b, a);
}
`,dd=Zn({__name:"ASCIIText",props:{text:{default:"Hello World!"},asciiFontSize:{default:12},textFontSize:{default:200},textColor:{default:"#fdf9f3"},planeBaseHeight:{default:8},enableWaves:{type:Boolean,default:!0}},setup(e){const n=e;function t(P,o,r,g,v){return(P-o)/(r-o)*(v-g)+g}const i=typeof window<"u"?window.devicePixelRatio:1;class l{constructor(o,{fontSize:r,fontFamily:g,charset:v,invert:m}={}){be(this,"renderer");be(this,"domElement");be(this,"pre");be(this,"canvas");be(this,"context");be(this,"deg");be(this,"invert");be(this,"fontSize");be(this,"fontFamily");be(this,"charset");be(this,"width",0);be(this,"height",0);be(this,"center",{x:0,y:0});be(this,"mouse",{x:0,y:0});be(this,"cols",0);be(this,"rows",0);this.renderer=o,this.domElement=document.createElement("div"),this.domElement.style.position="absolute",this.domElement.style.top="0",this.domElement.style.left="0",this.domElement.style.width="100%",this.domElement.style.height="100%",this.pre=document.createElement("pre"),this.domElement.appendChild(this.pre),this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.domElement.appendChild(this.canvas),this.deg=0,this.invert=m??!0,this.fontSize=r??12,this.fontFamily=g??"'Courier New', monospace",this.charset=v??" .'`^\",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",this.context&&(this.context.imageSmoothingEnabled=!1),this.onMouseMove=this.onMouseMove.bind(this),document.addEventListener("mousemove",this.onMouseMove)}setSize(o,r){this.width=o,this.height=r,this.renderer.setSize(o,r),this.reset(),this.center={x:o/2,y:r/2},this.mouse={x:this.center.x,y:this.center.y}}reset(){if(this.context){this.context.font=`${this.fontSize}px ${this.fontFamily}`;const o=this.context.measureText("A").width;this.cols=Math.floor(this.width/(this.fontSize*(o/this.fontSize))),this.rows=Math.floor(this.height/this.fontSize),this.canvas.width=this.cols,this.canvas.height=this.rows,this.pre.style.fontFamily=this.fontFamily,this.pre.style.fontSize=`${this.fontSize}px`,this.pre.style.margin="0",this.pre.style.padding="0",this.pre.style.lineHeight="1em",this.pre.style.position="absolute",this.pre.style.left="50%",this.pre.style.top="50%",this.pre.style.transform="translate(-50%, -50%)",this.pre.style.zIndex="9",this.pre.style.backgroundAttachment="fixed",this.pre.style.mixBlendMode="difference"}}render(o,r){this.renderer.render(o,r);const g=this.canvas.width,v=this.canvas.height;this.context&&(this.context.clearRect(0,0,g,v),this.context.drawImage(this.renderer.domElement,0,0,g,v),this.asciify(this.context,g,v),this.hue())}onMouseMove(o){this.mouse={x:o.clientX*i,y:o.clientY*i}}get dx(){return this.mouse.x-this.center.x}get dy(){return this.mouse.y-this.center.y}hue(){const o=Math.atan2(this.dy,this.dx)*180/Math.PI;this.deg+=(o-this.deg)*.075,this.domElement.style.filter=`hue-rotate(${this.deg.toFixed(1)}deg)`}asciify(o,r,g){const v=o.getImageData(0,0,r,g).data;let m="";for(let O=0;O<g;O++){for(let L=0;L<r;L++){const D=L*4+O*4*r,[B,p,f,C]=[v[D],v[D+1],v[D+2],v[D+3]];if(C===0){m+=" ";continue}const Y=(.3*B+.6*p+.1*f)/255;let H=Math.floor((1-Y)*(this.charset.length-1));this.invert&&(H=this.charset.length-H-1),m+=this.charset[H]}m+=`
`}this.pre.innerHTML=m}dispose(){document.removeEventListener("mousemove",this.onMouseMove)}}class s{constructor(o,{fontSize:r=200,fontFamily:g="Arial",color:v="#fdf9f3"}={}){be(this,"canvas");be(this,"context");be(this,"txt");be(this,"fontSize");be(this,"fontFamily");be(this,"color");be(this,"font");this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.txt=o,this.fontSize=r,this.fontFamily=g,this.color=v,this.font=`600 ${this.fontSize}px ${this.fontFamily}`}resize(){if(this.context){this.context.font=this.font;const o=this.context.measureText(this.txt),r=Math.ceil(o.width)+20,g=Math.ceil(o.actualBoundingBoxAscent+o.actualBoundingBoxDescent)+20;this.canvas.width=r,this.canvas.height=g}}render(){if(this.context){this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.fillStyle=this.color,this.context.font=this.font;const r=10+this.context.measureText(this.txt).actualBoundingBoxAscent;this.context.fillText(this.txt,10,r)}}get width(){return this.canvas.width}get height(){return this.canvas.height}get texture(){return this.canvas}}class h{constructor({text:o,asciiFontSize:r,textFontSize:g,textColor:v,planeBaseHeight:m,enableWaves:O},L,D,B){be(this,"textString");be(this,"asciiFontSize");be(this,"textFontSize");be(this,"textColor");be(this,"planeBaseHeight");be(this,"container");be(this,"width");be(this,"height");be(this,"enableWaves");be(this,"camera");be(this,"scene");be(this,"mouse");be(this,"textCanvas");be(this,"texture");be(this,"geometry");be(this,"material");be(this,"mesh");be(this,"renderer");be(this,"filter");be(this,"center",{x:0,y:0});be(this,"animationFrameId",0);this.textString=o,this.asciiFontSize=r,this.textFontSize=g,this.textColor=v,this.planeBaseHeight=m,this.container=L,this.width=D,this.height=B,this.enableWaves=O,this.camera=new Qt(45,this.width/this.height,1,1e3),this.camera.position.z=30,this.scene=new go,this.mouse={x:this.width/2,y:this.height/2},this.onMouseMove=this.onMouseMove.bind(this)}async init(){try{await document.fonts.load('600 200px "IBM Plex Mono"'),await document.fonts.load('500 12px "IBM Plex Mono"')}catch{}await document.fonts.ready,this.setMesh(),this.setRenderer()}setMesh(){this.textCanvas=new s(this.textString,{fontSize:this.textFontSize,fontFamily:"IBM Plex Mono",color:this.textColor}),this.textCanvas.resize(),this.textCanvas.render(),this.texture=new Eo(this.textCanvas.texture),this.texture.minFilter=zt;const o=this.textCanvas.width/this.textCanvas.height,r=this.planeBaseHeight,g=r*o,v=r;this.geometry=new $n(g,v,36,36),this.material=new Ct({vertexShader:ld,fragmentShader:fd,transparent:!0,uniforms:{uTime:{value:0},mouse:{value:1},uTexture:{value:this.texture},uEnableWaves:{value:this.enableWaves?1:0}}}),this.mesh=new At(this.geometry,this.material),this.scene.add(this.mesh)}setRenderer(){this.renderer=new cd({antialias:!1,alpha:!0}),this.renderer.setPixelRatio(1),this.renderer.setClearColor(0,0),this.filter=new l(this.renderer,{fontFamily:"IBM Plex Mono",fontSize:this.asciiFontSize,invert:!0}),this.container.appendChild(this.filter.domElement),this.setSize(this.width,this.height),this.container.addEventListener("mousemove",this.onMouseMove),this.container.addEventListener("touchmove",this.onMouseMove)}setSize(o,r){this.width=o,this.height=r,this.camera.aspect=o/r,this.camera.updateProjectionMatrix(),this.filter.setSize(o,r),this.center={x:o/2,y:r/2}}load(){this.animate()}onMouseMove(o){const r=o.touches?o.touches[0]:o,g=this.container.getBoundingClientRect(),v=r.clientX-g.left,m=r.clientY-g.top;this.mouse={x:v,y:m}}animate(){const o=()=>{this.animationFrameId=requestAnimationFrame(o),this.render()};o()}render(){const o=new Date().getTime()*.001;this.textCanvas.render(),this.texture.needsUpdate=!0,this.mesh.material.uniforms.uTime.value=Math.sin(o),this.updateRotation(),this.filter.render(this.scene,this.camera)}updateRotation(){const o=t(this.mouse.y,0,this.height,.5,-.5),r=t(this.mouse.x,0,this.width,-.5,.5);this.mesh.rotation.x+=(o-this.mesh.rotation.x)*.05,this.mesh.rotation.y+=(r-this.mesh.rotation.y)*.05}clear(){this.scene.traverse(o=>{const r=o;r.isMesh&&([r.material].flat().forEach(g=>{g.dispose(),Object.keys(g).forEach(v=>{const m=g[v];m&&typeof m=="object"&&"dispose"in m&&typeof m.dispose=="function"&&m.dispose()})}),r.geometry.dispose())}),this.scene.clear()}dispose(){cancelAnimationFrame(this.animationFrameId),this.filter&&(this.filter.dispose(),this.filter.domElement.parentNode&&this.container.removeChild(this.filter.domElement)),this.container.removeEventListener("mousemove",this.onMouseMove),this.container.removeEventListener("touchmove",this.onMouseMove),this.clear(),this.renderer&&(this.renderer.dispose(),this.renderer.forceContextLoss())}}const d=Ur(null);let b=null,S=null,w=null,x=!1;async function M(P,o,r){const g=new h({text:n.text,asciiFontSize:n.asciiFontSize,textFontSize:n.textFontSize,textColor:n.textColor,planeBaseHeight:n.planeBaseHeight,enableWaves:n.enableWaves},P,o,r);return await g.init(),g}async function R(){const P=d.value;if(!P)return;x=!1;const{width:o,height:r}=P.getBoundingClientRect();if(o===0||r===0){S=new IntersectionObserver(async([g])=>{if(!x&&g.isIntersecting&&g.boundingClientRect.width>0&&g.boundingClientRect.height>0){const{width:v,height:m}=g.boundingClientRect;S==null||S.disconnect(),S=null,x||(b=await M(P,v,m),!x&&b&&b.load())}},{threshold:.1}),S.observe(P);return}b=await M(P,o,r),!x&&b&&(b.load(),w=new ResizeObserver(g=>{if(!g[0]||!b)return;const{width:v,height:m}=g[0].contentRect;v>0&&m>0&&b.setSize(v,m)}),w.observe(P))}function N(){x=!0,S&&(S.disconnect(),S=null),w&&(w.disconnect(),w=null),b&&(b.dispose(),b=null)}return Pr(R),Lr(N),So(()=>[n.text,n.asciiFontSize,n.textFontSize,n.textColor,n.planeBaseHeight,n.enableWaves],()=>{N(),R()}),(P,o)=>(vn(),Yn("div",{ref_key:"containerRef",ref:d,class:"ascii-text-container"},null,512))}}),ud={class:"nf-root"},pd={class:"nf-ascii"},hd={class:"nf-text"},md=Zn({__name:"NotFound404",setup(e){const n=Ur(5);let t=null;function i(){window.location.href="/"}function l(){t=xo(()=>{n.value-=1,n.value<=0&&(t&&clearInterval(t),i())},1e3)}return Pr(()=>{l()}),Lr(()=>{t&&clearInterval(t)}),(s,h)=>{const d=Wr;return vn(),Yn(Gi,null,[on(d,null,{default:Bi(()=>[on(Xr)]),_:1}),Ot("div",ud,[Ot("div",pd,[on(d,null,{default:Bi(()=>[on(dd,{text:"页面不存在","enable-waves":!1,"ascii-font-size":10,"plane-base-height":8})]),_:1})]),Ot("div",hd,[h[1]||(h[1]=Ot("p",{class:"nf-line"},"当前路径不可达。",-1)),h[2]||(h[2]=Ot("p",{class:"nf-line"},"Agent 已重新计算最佳路线。",-1)),Ot("button",{class:"nf-back",type:"button",onClick:i},[h[0]||(h[0]=Hi(" 返回首页",-1)),(vn(),Yn(Gi,{key:0},[Hi("（"+Mo(n.value)+"s）",1)],64))])])])],64)}}}),_d=To(md,[["__scopeId","data-v-b56a4642"]]),Pd=Zn({__name:"[...slug]",setup(e){return Ao({title:"404 - 页面未找到 | Panda AI"}),(n,t)=>(vn(),Ro(_d))}});export{Pd as default};
