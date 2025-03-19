document.addEventListener('DOMContentLoaded', () => {
	// Function to capitalize each word
	const capitalizeEachWord = (text) => {
		return text
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	//categories list
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

	// get the selects
	const categorySelect = document.getElementById('category-select');
	const statusSelect = document.querySelector("[name='status']");
	const priceSelect = document.querySelector("[name='price']");
	const limitInput = document.getElementById('limit-input');
	const resetButton = document.getElementById('reset-filters');

	// Add array options to the categories select
	if (categorySelect) {
		categoryList.forEach((category) => {
			const option = document.createElement('option');
			option.value = category;
			option.textContent = capitalizeEachWord(category.replace('-', ' '));
			categorySelect.appendChild(option);
		});
	}

	// get URL values ​​and apply them to the selects
	const urlParams = new URLSearchParams(window.location.search);
	const selectedCategory = urlParams.get('category');
	const selectedStatus = urlParams.get('status');
	const selectedPrice = urlParams.get('priceOrder');
	const selectedLimit = urlParams.get('limit');

	if (selectedCategory && categorySelect) {
		categorySelect.value = selectedCategory;
	}
	if (selectedStatus && statusSelect) {
		statusSelect.value = selectedStatus;
	}
	if (selectedPrice && priceSelect) {
		priceSelect.value = selectedPrice;
	}
	if (selectedLimit && limitInput) {
		limitInput.value = selectedLimit;
	}

	// Handle form filters
	const filtersForm = document.getElementById('filters-form');
	if (filtersForm) {
		filtersForm.addEventListener('submit', (event) => {
			event.preventDefault();

			const category = categorySelect.value;
			const status = statusSelect.value;
			const price = priceSelect.value;
			const limit = limitInput.value;

			// Build the URL with filters
			const params = new URLSearchParams();
			if (category !== 'all') params.append('category', category);
			if (status !== 'all') params.append('status', status);
			if (price) params.append('priceOrder', price);
			if (limit) params.append('limit', limit);

			// Redirect with the filters applied
			window.location.href = `/products?${params.toString()}`;
		});
	}

	// Button "Reset Filters"
	if (resetButton) {
		resetButton.addEventListener('click', () => {
			// Resetear los selects a su valor por defecto
			if (categorySelect) categorySelect.value = 'all';
			if (statusSelect) statusSelect.value = 'all';
			if (priceSelect) priceSelect.value = 'asc';
			if (limitInput) limitInput.value = '10';

			// Redirect the page without filters
			window.location.href = '/products'; // Redirige sin parámetros
		});
	}

	// functionality of the delete button in the product card
	const deleteForms = document.querySelectorAll('.delete-form');

	deleteForms.forEach((form) => {
		const button = form.querySelector('.button-delete');

		button.addEventListener('click', (event) => {
			event.preventDefault(); // Avoid immediate elimination

			Swal.fire({
				title: 'Are you sure?',
				text: 'This action cannot be undone!',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#3085d6',
				confirmButtonText: 'Yes, delete it!',
			}).then((result) => {
				if (result.isConfirmed) {
					form.submit(); // If the user confirms, the form is sent
				}
			});
		});
	});
});
