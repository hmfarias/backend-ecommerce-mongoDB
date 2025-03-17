const capitalizeEachWord = (text) => {
	return text
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

const categoryList = [
	'beauty',
	'fragrances',
	'furniture',
	'groceries',
	'home-decoration',
	'kitchen-accessories',
	'laptops',
	'mens-shirts',
	'mens-shoes',
	'mens-watches',
	'mobile-accessories',
	'motorcycle',
	'skin-care',
	'smartphones',
	'sports-accessories',
	'sunglasses',
	'tablets',
	'tops',
	'vehicle',
	'womens-bags',
	'womens-dresses',
	'womens-jewellery',
	'womens-shoes',
	'womens-watches',
];

// Obtén el select por su id
const categorySelect = document.getElementById('category-select');

// Añadir opciones del array al select
categoryList.forEach((category) => {
	const option = document.createElement('option');
	option.value = category; // Asigna el valor de la opción
	option.textContent = capitalizeEachWord(category.replace('-', ' '));
	categorySelect.appendChild(option); // Añadir la opción al select
});
