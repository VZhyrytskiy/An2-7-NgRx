// subName - the name of the property with Subscription
// default name is sub
export function AutoUnsubscribe(subName: string = 'sub') {
  return (constructor: any) => {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function(): void {
      const sub = this[subName];

      sub?.unsubscribe();

      if (original && (typeof original === 'function')) {
        original.apply(this, arguments);
      }

      console.log(`Unsubscribe decorator is called. Subscription name is: ${subName}.`);
    };
  };
}
