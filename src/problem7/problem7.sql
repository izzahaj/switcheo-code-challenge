/*
Write an SQL query that returns the the list of addresses which has recently made a trade,
and wallet has at least $500 (total balance) in it.

Constraints:
1. recently made a trade --> block_height > 730000
2. 3 denoms: usdc, swth, tmz
3. need to calculate wallet values on the fly
4. Only use a single query statement
*/

-- find sum of amount (* denom value) column in balances table for each address
-- find all addresses that made trades with block_height > 730000
-- join the tables
-- only return the list of addresses
-- remove duplicates with DISTINCT

SELECT DISTINCT trades.address
FROM trades
INNER JOIN (
  SELECT balances.address, SUM(amount * (
    CASE denom
    WHEN 'usdc' then 0.000001
    WHEN 'SWTH' then 0.00000005
    WHEN 'tmz' then 0.003
    END
  )) AS total
  FROM balances
  GROUP BY address
) AS bals
ON bals.address = trades.address
WHERE block_height > 730000 AND total >= 500;
