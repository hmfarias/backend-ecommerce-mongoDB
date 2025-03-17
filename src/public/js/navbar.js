document.addEventListener('DOMContentLoaded', () => {
	// Obtain the element with the ID "cart-link"
	const cartLink = document.getElementById('cart-link');

	// Add a click event to the cart link
	cartLink.addEventListener('click', async (event) => {
		event.preventDefault();

		// Get the cartId from LocalStorage
		const cartId = localStorage.getItem('cartId');

		// Verify if there is a cartId in LocalStorage
		if (!cartId) {
			await Swal.fire({
				title: 'Warning!',
				text: 'No cart found. Please add products to create it',
				icon: 'warning',
				position: 'top-end',
				timer: 2500,
				showConfirmButton: false,
				toast: true,
			});
			// Redirect to the home page
			window.location.href = '/';
			return;
		}

		// Redirect to the cart if it exists
		window.location.href = `/carts/${cartId}`;
	});
});
