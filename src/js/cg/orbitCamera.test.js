import test from 'node:test';
import assert from 'node:assert/strict';
import {
	ORBIT,
	ORBIT_FRAME_CAP_SECONDS,
	PREVIOUS_OPENING_ANGULAR_SPEED,
	advanceOrbitAngle,
	orbitPosition
} from './orbitCamera.js';

test('angular speed stays constant across a long session', () => {
	const dt = 1 / 60;
	const frames = 60 * 60 * 20;
	let angle = 0;
	for (let i = 0; i < frames; i++) angle = advanceOrbitAngle(angle, dt);
	const expected = frames * dt * ORBIT.angularSpeed;
	assert.ok(Math.abs(angle - expected) < 1e-6, `angle drifted: ${angle} vs ${expected}`);
});

test('a stalled frame cannot fast-forward the orbit', () => {
	const advanced = advanceOrbitAngle(0, 30);
	const cap = ORBIT_FRAME_CAP_SECONDS * ORBIT.angularSpeed;
	assert.ok(Math.abs(advanced - cap) < 1e-12);
});

test('repeated hitches do not accumulate extra speed', () => {
	let angle = 0;
	for (let i = 0; i < 100; i++) angle = advanceOrbitAngle(angle, 5);
	const expected = 100 * ORBIT_FRAME_CAP_SECONDS * ORBIT.angularSpeed;
	assert.ok(Math.abs(angle - expected) < 1e-9);
});

test('negative or non-numeric deltas do not move the camera backward', () => {
	assert.equal(advanceOrbitAngle(1, -2), 1);
	assert.equal(advanceOrbitAngle(1, Number.NaN), 1);
});

test('viewing distance stays at the polished orbit', () => {
	for (const angle of [0, 0.5, 2, 10, 100, 1000]) {
		const position = orbitPosition(angle);
		const radius = Math.hypot(position.x, position.z);
		assert.ok(Math.abs(radius - ORBIT.radius) < 1e-6);
		assert.equal(position.y, ORBIT.height);
	}
});

test('reduced motion holds the camera still without forgetting later frames', () => {
	const held = advanceOrbitAngle(1.25, 2, { motionEnabled: false });
	assert.equal(held, 1.25);
	const resumed = advanceOrbitAngle(held, 1 / 60, { motionEnabled: true });
	assert.ok(Math.abs(resumed - (1.25 + (1 / 60) * ORBIT.angularSpeed)) < 1e-12);
});

test('rotation is a little slower than the old spiral opening rate', () => {
	assert.ok(ORBIT.angularSpeed < PREVIOUS_OPENING_ANGULAR_SPEED);
	assert.ok(ORBIT.angularSpeed > PREVIOUS_OPENING_ANGULAR_SPEED * 0.8);
});
