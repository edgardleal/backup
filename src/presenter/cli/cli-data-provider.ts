/**
 * cli-data-provider.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module cli-data-provider.ts
 */
export default interface CliDataProvider<D = any> {
  getData: () => Promise<D>;
}
