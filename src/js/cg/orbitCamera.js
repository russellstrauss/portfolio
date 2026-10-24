// Steady orbit for the starfield background.
//
// The previous path was a logarithmic spiral sampled by arc length. Linear
// speed stayed constant while the radius fell toward the origin, so the
// view's angular speed grew without bound (about 0.24 deg/s at the start,
// ~10x that after 15 minutes). A stalled frame also replaced the playback
// position with `(Date.now() / 1000 * speed) % 1`, which is a clock phase,
// not the place the camera already was — so a load hitch or a backgrounded
// tab could drop the camera onto the fast inner coils.
//
// This orbit keeps the opening framing (same height, same distance from the
// origin) and a slightly slower constant angular speed. Missed time is
// dropped instead of applied, so a hitch cannot skip ahead or speed up.

export const ORBIT_FRAME_CAP_SECONDS = 0.05;

// Opening rate of the old spiral, measured at its outer radius. The orbit
// below is a little slower than that and does not change along the path.
export const PREVIOUS_OPENING_ANGULAR_SPEED = 0.00412;

export const ORBIT = {
	radius: 1700,
	height: 500,
	angularSpeed: 0.0035
};

export function advanceOrbitAngle(angle, dtSeconds, options = {}) {
	const angularSpeed = options.angularSpeed ?? ORBIT.angularSpeed;
	const motionEnabled = options.motionEnabled ?? true;
	const frameCap = options.frameCap ?? ORBIT_FRAME_CAP_SECONDS;
	const step = Math.min(Math.max(Number(dtSeconds) || 0, 0), frameCap);
	if (!motionEnabled) return angle;
	// Positive angle is counterclockwise around Y. Subtract so the camera
	// turns the other way at the same speed.
	return angle - step * angularSpeed;
}

export function orbitPosition(angle, options = {}) {
	const radius = options.radius ?? ORBIT.radius;
	const height = options.height ?? ORBIT.height;
	return {
		x: Math.cos(angle) * radius,
		y: height,
		z: Math.sin(angle) * radius
	};
}
