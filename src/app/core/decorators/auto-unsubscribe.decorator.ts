// subName - the name of the property with Subscription, default name is sub
// target - constructor for class decorator and prototype for property decorator
// propName - is used only in property decorataror, provides the name of property
export function AutoUnsubscribe(subName: string = 'sub') {
  return (target: Function | object, propName?: string) => {
    let constructor;

    if (typeof target === 'function') {
      constructor = target;
      console.log(`AutoUnsubscribe class decorator is called. Subscription name is: ${propName ?? subName}.`);
    } else {
      constructor = target.constructor;
      console.log(`AutoUnsubscribe property decorator is called. Subscription name is: ${propName ?? subName}.`);
    }

    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function(): void {
      const sub = this[propName ?? subName];

      sub?.unsubscribe();

      if (original && (typeof original === 'function')) {
        original.apply(this);
      }
    };
  };
}
