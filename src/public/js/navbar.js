document.addEventListener('DOMContentLoaded', () => {
	// Obtain the element with the ID "cart-link"
	const cartLink = document.getElementById('cart-link');

	// Add a click event to the cart link
	cartLink.addEventListener('click', (event) => {
		event.preventDefault();

		// Get the cartId from LocalStorage
		const cartId = localStorage.getItem('cartId');

		// Verify if there is a cartId in LocalStorage
		if (!cartId) {
			// If there is no cart, show an error message or redirect the cart creation page
			Swal.fire({
				title: 'Warning!',
				text: 'No cart found. Please create a cart first.',
				icon: 'warning',
				position: 'top-end',
				timer: 2000,
				showConfirmButton: false,
				toast: true,
			});
		}
		// Redirect the endpoint /:cid
		window.location.href = `/carts/${cartId}`;
	});
});
