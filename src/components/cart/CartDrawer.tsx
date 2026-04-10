'use client';

import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, isOpen, setIsOpen } = useCart();

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={() => setIsOpen(false)}
      />
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.header}>
          <span className={styles.title}>Cart</span>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            &times;
          </button>
        </div>

        <div className={styles.items}>
          {cartItems.length === 0 ? (
            <p className={styles.emptyMsg}>Your cart is empty.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.product.cat} className={styles.item}>
                <div className={styles.itemInfo}>
                  <div className={styles.itemName}>{item.product.name}</div>
                  <div className={styles.itemSize}>{item.product.size}</div>
                  <div className={styles.itemPrice}>{formatPrice(item.product.boxPrice)}</div>
                  <div className={styles.quantityRow}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.product.cat, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className={styles.qtyValue}>{item.quantity}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.product.cat, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.product.cat)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.comingSoon}>Checkout coming soon</div>
            <button className={styles.clearBtn} onClick={clearCart}>
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
