
export function fakeSign(payload: object): string {
  return Buffer.from(JSON.stringify(payload)).toString('base64')
}

export function fakeVerify(token: string): any {
  return JSON.parse(Buffer.from(token, 'base64').toString())
}
