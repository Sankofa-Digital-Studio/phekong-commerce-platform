"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ActionFeedback, type FeedbackState } from "@/components/ui/ActionFeedback";
import { Button } from "@/components/ui/Button";
import "./commerce-screen.css";

export type CommerceScreenKind = "cart" | "wishlist" | "account";

const products = [
  { name: "Nourishing Shea Butter", detail: "250 ml · In stock", price: 320, symbol: "SB" },
  { name: "Growth & Strength Oil", detail: "100 ml · Low stock", price: 280, symbol: "GO" },
];

const saved = [
  { name: "Exfoliating Sugar Scrub", detail: "A brightening weekly ritual", price: "R 190.00", symbol: "SS" },
  { name: "Turmeric & Honey Soap", detail: "Gentle everyday cleansing", price: "R 85.00", symbol: "TH" },
  { name: "Nourishing Shea Butter", detail: "Deep moisture for skin and hair", price: "R 320.00", symbol: "SB" },
];

const copy = {
  cart: { eyebrow: "Your basket", title: "A thoughtful ritual, almost yours.", intro: "Review your selected products before continuing. Checkout remains in preview until secure payment is connected." },
  wishlist: { eyebrow: "Saved for later", title: "Keep the rituals that caught your eye.", intro: "Your current shortlist is available in this browser preview. Sign-in persistence will arrive with the account milestone." },
  account: { eyebrow: "Your space", title: "Wellness on your terms.", intro: "Browse freely without an account, or preview the controls that will keep orders, addresses, and favourites together." },
} satisfies Record<CommerceScreenKind, { eyebrow: string; title: string; intro: string }>;

export function CommerceScreen({ kind }: { kind: CommerceScreenKind }) {
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [quantities, setQuantities] = useState([1, 1]);
  const [savedItems, setSavedItems] = useState(saved);
  const content = copy[kind];
  const subtotal = products.reduce((sum, product, index) => sum + product.price * quantities[index], 0);
  const announce = (message: string, tone: FeedbackState["tone"] = "success") => setFeedback({ message, tone });

  return (
    <div className="commerce-screen">
      <header className="commerce-screen__hero"><p>{content.eyebrow}</p><h1>{content.title}</h1><span>{content.intro}</span></header>
      {kind === "cart" && <div className="commerce-screen__layout"><section className="commerce-panel" aria-labelledby="cart-items"><PanelHeading id="cart-items" count="2 items">Your cart</PanelHeading><div className="commerce-list">{products.map((product,index)=><ProductRow key={product.name} symbol={product.symbol} name={product.name} detail={product.detail} price={`R ${(product.price*quantities[index]).toFixed(2)}`}><Quantity value={quantities[index]} label={product.name} onChange={(next)=>{setQuantities(current=>current.map((value,i)=>i===index?next:value));announce(`${product.name} quantity updated to ${next}.`)}}/></ProductRow>)}</div><Link className="commerce-text-link" href="/products">← Continue shopping</Link></section><aside className="commerce-panel commerce-summary" aria-labelledby="summary-title"><PanelHeading id="summary-title">Order summary</PanelHeading><SummaryLine label="Subtotal" value={`R ${subtotal.toFixed(2)}`}/><SummaryLine label="Delivery" value="Calculated next"/><SummaryLine label="Total" value={`R ${subtotal.toFixed(2)}`} total/><Button onClick={()=>announce("Secure checkout is not connected yet.","blocked")}>Continue to secure checkout</Button><small>No payment will be taken in preview mode.</small></aside></div>}
      {kind === "wishlist" && <section className="commerce-panel" aria-labelledby="wishlist-items"><PanelHeading id="wishlist-items" count={`${savedItems.length} saved`}>Your favourites</PanelHeading>{savedItems.length ? <div className="commerce-grid">{savedItems.map(item=><article className="saved-card" key={item.name}><div className="product-token" aria-hidden="true">{item.symbol}</div><p>{item.detail}</p><h2>{item.name}</h2><strong>{item.price}</strong><div><Button onClick={()=>announce(`${item.name} moved to the cart preview.`)}>Move to cart</Button><button className="commerce-remove" onClick={()=>{setSavedItems(current=>current.filter(savedItem=>savedItem.name!==item.name));announce(`${item.name} removed from saved items.`)}}>Remove</button></div></article>)}</div>:<EmptyState title="Your wishlist is ready for something good." action="Browse products" href="/products"/>}</section>}
      {kind === "account" && <div className="commerce-screen__layout"><section className="commerce-panel account-welcome"><PanelHeading>Your account preview</PanelHeading><div className="account-avatar" aria-hidden="true">P</div><h2>Welcome to a calmer way to shop.</h2><p>Create an account later to keep orders, saved products, delivery details, and ritual recommendations in one place.</p><div className="account-actions"><Button onClick={()=>announce("Account creation is coming with secure sign-in.","blocked")}>Create an account</Button><Button variant="secondary" onClick={()=>announce("Sign-in is not connected yet.","blocked")}>Sign in</Button></div><small>Browsing and checkout will not require an account.</small></section><aside className="commerce-panel account-benefits"><PanelHeading>Why create an account?</PanelHeading><Benefit icon="01" title="Track every order">See progress and revisit past purchases.</Benefit><Benefit icon="02" title="Save your ritual">Keep favourites and build a repeatable routine.</Benefit><Benefit icon="03" title="Checkout with less effort">Reuse delivery details when you choose to save them.</Benefit></aside></div>}
      <ActionFeedback state={feedback}/>
    </div>
  );
}

function PanelHeading({children,id,count}:{children:ReactNode;id?:string;count?:string}){return <div className="panel-heading"><h2 id={id}>{children}</h2>{count&&<span>{count}</span>}</div>}
function ProductRow({symbol,name,detail,price,children}:{symbol:string;name:string;detail:string;price:string;children:ReactNode}){return <article className="product-row"><div className="product-token" aria-hidden="true">{symbol}</div><div className="product-row__copy"><h3>{name}</h3><p>{detail}</p></div>{children}<strong>{price}</strong></article>}
function Quantity({value,label,onChange}:{value:number;label:string;onChange:(value:number)=>void}){return <div className="quantity" aria-label={`Quantity for ${label}`}><button aria-label={`Decrease ${label} quantity`} disabled={value===1} onClick={()=>onChange(Math.max(1,value-1))}>−</button><output aria-live="polite">{value}</output><button aria-label={`Increase ${label} quantity`} onClick={()=>onChange(value+1)}>+</button></div>}
function SummaryLine({label,value,total=false}:{label:string;value:string;total?:boolean}){return <div className={total?"summary-line is-total":"summary-line"}><span>{label}</span><strong>{value}</strong></div>}
function EmptyState({title,action,href}:{title:string;action:string;href:string}){return <div className="commerce-empty"><span aria-hidden="true">♡</span><h2>{title}</h2><Link href={href}>{action}</Link></div>}
function Benefit({icon,title,children}:{icon:string;title:string;children:ReactNode}){return <article className="benefit"><span>{icon}</span><div><h3>{title}</h3><p>{children}</p></div></article>}
