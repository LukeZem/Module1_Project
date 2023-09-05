const background = document.getElementById("background");
const cubes = document.querySelectorAll(".cube");

const getRandomValue = (min, max) => {
	return Math.random() * (max - min) + min;
};

const getRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

cubes.forEach((cube, index) => {
	const randomTop = getRandomValue(0, 100);
	const randomLeft = getRandomValue(0, 80);
	const randomRadius = getRandomValue(0, 25);
	const randomColor = getRandomColor();
	const randomNum = getRandomValue(50, 150);

	cube.style.top = `${randomTop}vh`;
	cube.style.left = `${randomLeft}vw`;
	cube.style.borderRadius = `${randomRadius}%`;

	// applying random color
	cube.style.borderColor = randomColor;

	// Applying different animation delays for odd and even cubes
	const animationDelay = index % 2 === 0 ? index * 2 + 2 : index * 2;
	cube.style.animationDelay = `${getRandomValue(2, 14)}s`;
});
