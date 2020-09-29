export const functionLogFormatter = (scope: string, name: string, args: any[], message?: string) =>
  `${ scope }: Method ${ name } called ${ args && args.length ? 'with ' + args.map(el => JSON.stringify(el)).join(', ') :
    '' }${ message ? ': ' + message : '' }`;
