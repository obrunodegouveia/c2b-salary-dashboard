"use client";

import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, CartesianGrid } from "recharts";
import * as XLSX from "xlsx";

const DEFAULT_DATA = [{"n": "Sérgio Fonseca", "d": "Compras", "e": "Curso Profissional Superior", "r": "Vendor Compliance Specialist", "vb": 1225, "sa": 224.4, "km": 0, "nk": 0, "vt": 19843, "ns": 1275, "ab": 50, "ta": 20611, "pa": 0.038736, "cm26": 2084, "ca26": 25004, "cm25": 2005, "ca25": 24063, "dm": 78, "da": 941, "rmn": 17160, "rmd": 18229}, {"n": "Francisca von Hafe", "d": "Compras", "e": "Mestrado", "r": "Head of Compras", "vb": 1600, "sa": 224.4, "km": 350.0, "nk": 350.0, "vt": 29293, "ns": 1950, "ab": 350, "ta": 34261, "pa": 0.16962, "cm26": 3415, "ca26": 40979, "cm25": 2900, "ca25": 34805, "dm": 515, "da": 6174, "rmn": 25065, "rmd": 26699}, {"n": "Franscisco Martins", "d": "Compras", "e": "Licenciatura", "r": "Vendor Compliance Assistant", "vb": 1000, "sa": 224.4, "km": 0, "nk": 0, "vt": 16693, "ns": 1040, "ab": 40, "ta": 17321, "pa": 0.037659, "cm26": 1742, "ca26": 20904, "cm25": 1678, "ca25": 20138, "dm": 64, "da": 766, "rmn": 15825, "rmd": 16799}, {"n": "Inês Babo", "d": "Compras", "e": "Mestrado", "r": "Lead Buyer", "vb": 1550, "sa": 224.4, "km": 0, "nk": 0, "vt": 24393, "ns": 1550, "ab": 0, "ta": 0, "pa": -1.0, "cm26": 0, "ca26": 0, "cm25": 0, "ca25": 0, "dm": 0, "da": 0, "rmn": 21500, "rmd": 22884}, {"n": "Mafalda Castro", "d": "Compras", "e": "Mestrado", "r": "Assistant Buyer", "vb": 1300, "sa": 224.4, "km": 0, "nk": 0, "vt": 20893, "ns": 1450, "ab": 150, "ta": 23061, "pa": 0.103798, "cm26": 2338, "ca26": 28057, "cm25": 2114, "ca25": 25371, "dm": 224, "da": 2685, "rmn": 18700, "rmd": 19880}, {"n": "Juliana  Cardoso", "d": "Compras", "e": "Mestrado", "r": "Lead Buyer", "vb": 1450, "sa": 224.4, "km": 0, "nk": 0, "vt": 22993, "ns": 1600, "ab": 150, "ta": 25161, "pa": 0.094318, "cm26": 2556, "ca26": 30673, "cm25": 2332, "ca25": 27988, "dm": 224, "da": 2685, "rmn": 21500, "rmd": 22884}, {"n": "Sara Dias", "d": "Compras", "e": "Mestrado", "r": "Assistant Buyer", "vb": 1250, "sa": 224.4, "km": 0, "nk": 0, "vt": 20193, "ns": 1250, "ab": 0, "ta": 20261, "pa": 0.003399, "cm26": 2047, "ca26": 24568, "cm25": 2042, "ca25": 24499, "dm": 6, "da": 69, "rmn": 18400, "rmd": 19560}, {"n": "Diana Barbosa", "d": "Compras", "e": "Mestrado", "r": "Digital Account Manager", "vb": 1400, "sa": 224.4, "km": 0, "nk": 0, "vt": 22293, "ns": 1550, "ab": 150, "ta": 24461, "pa": 0.09728, "cm26": 2483, "ca26": 29801, "cm25": 2260, "ca25": 27116, "dm": 224, "da": 2685, "rmn": 20390, "rmd": 21690}, {"n": "Ana Maia", "d": "Compras", "e": "Licenciatura", "r": "Assistant Buyer", "vb": 1100, "sa": 224.4, "km": 0, "nk": 0, "vt": 18093, "ns": 1150, "ab": 50, "ta": 18861, "pa": 0.042483, "cm26": 1902, "ca26": 22823, "cm25": 1824, "ca25": 21882, "dm": 78, "da": 941, "rmn": 18400, "rmd": 19560}, {"n": "Catarina Costa", "d": "Compras", "e": "Mestrado", "r": "Assistant Buyer", "vb": 1100, "sa": 224.4, "km": 0, "nk": 0, "vt": 18093, "ns": 1250, "ab": 150, "ta": 20261, "pa": 0.119862, "cm26": 2047, "ca26": 24568, "cm25": 1824, "ca25": 21882, "dm": 224, "da": 2685, "rmn": 18400, "rmd": 19560}, {"n": "Joana Ribeiro", "d": "Compras", "e": "Licenciatura", "r": "Assistant Buyer", "vb": 1517, "sa": 224.4, "km": 0, "nk": 0, "vt": 23931, "ns": 1517, "ab": 0, "ta": 23999, "pa": 0.002868, "cm26": 2435, "ca26": 29226, "cm25": 2430, "ca25": 29157, "dm": 6, "da": 69, "rmn": 18400, "rmd": 19560}, {"n": "Ana Oliveira", "d": "Conteúdos", "e": "Licenciatura", "r": "Head of Content", "vb": 1784, "sa": 224.4, "km": 409.0, "nk": 409.0, "vt": 32577, "ns": 1784, "ab": 0, "ta": 32645, "pa": 0.002107, "cm26": 3233, "ca26": 38791, "cm25": 3227, "ca25": 38723, "dm": 6, "da": 69, "rmn": 30400, "rmd": 32420}, {"n": "Ana Ferreira", "d": "Conteúdos", "e": "Mestrado", "r": "Blog Editor", "vb": 1585, "sa": 224.4, "km": 0, "nk": 0, "vt": 24883, "ns": 1630, "ab": 45, "ta": 25581, "pa": 0.028077, "cm26": 2600, "ca26": 31197, "cm25": 2529, "ca25": 30343, "dm": 71, "da": 854, "rmn": 21715, "rmd": 23115}, {"n": "Rui Vilaça", "d": "Conteúdos", "e": "12º Ano", "r": "Lead Catalog Specialist", "vb": 1200, "sa": 224.4, "km": 0, "nk": 0, "vt": 19493, "ns": 1250, "ab": 50, "ta": 20261, "pa": 0.039432, "cm26": 2047, "ca26": 24568, "cm25": 1969, "ca25": 23627, "dm": 78, "da": 941, "rmn": 16600, "rmd": 17630}, {"n": "Sofia Alves", "d": "Conteúdos", "e": "Mestrado", "r": "Blog Content Editor", "vb": 1362, "sa": 224.4, "km": 0, "nk": 0, "vt": 21761, "ns": 1397, "ab": 35, "ta": 22319, "pa": 0.025672, "cm26": 2261, "ca26": 27132, "cm25": 2204, "ca25": 26453, "dm": 57, "da": 679, "rmn": 20260, "rmd": 21550}, {"n": "Diogo Almeida", "d": "Conteúdos", "e": "12º Ano", "r": "Catalog Specialist", "vb": 960, "sa": 224.4, "km": 0, "nk": 0, "vt": 16133, "ns": 1000, "ab": 40, "ta": 16761, "pa": 0.038967, "cm26": 1684, "ca26": 20206, "cm25": 1620, "ca25": 19440, "dm": 64, "da": 766, "rmn": 15300, "rmd": 16240}, {"n": "Ariana Barros", "d": "Conteúdos", "e": "Licenciatura", "r": "Product Specialist", "vb": 1250, "sa": 224.4, "km": 0, "nk": 0, "vt": 20193, "ns": 1290, "ab": 40, "ta": 20821, "pa": 0.031132, "cm26": 2105, "ca26": 25265, "cm25": 2042, "ca25": 24499, "dm": 64, "da": 766, "rmn": 19370, "rmd": 20590}, {"n": "Tânia Morim", "d": "Conteúdos", "e": "Mestrado", "r": "Product Content Writer", "vb": 1250, "sa": 224.4, "km": 0, "nk": 0, "vt": 20193, "ns": 1290, "ab": 40, "ta": 20821, "pa": 0.031132, "cm26": 2105, "ca26": 25265, "cm25": 2042, "ca25": 24499, "dm": 64, "da": 766, "rmn": 19370, "rmd": 20590}, {"n": "João Rego", "d": "Customer Service", "e": "12º Ano", "r": "Customer Care Agent", "vb": 990, "sa": 224.4, "km": 0, "nk": 0, "vt": 16553, "ns": 1010, "ab": 20, "ta": 16901, "pa": 0.021062, "cm26": 1698, "ca26": 20381, "cm25": 1664, "ca25": 19963, "dm": 35, "da": 418, "rmn": 17300, "rmd": 18385}, {"n": "Madalena Santos", "d": "Customer Service", "e": "Bacharelato", "r": "Customer Care Agent", "vb": 1130, "sa": 224.4, "km": 0, "nk": 0, "vt": 18513, "ns": 1160, "ab": 30, "ta": 19001, "pa": 0.026395, "cm26": 1916, "ca26": 22998, "cm25": 1867, "ca25": 22406, "dm": 49, "da": 592, "rmn": 17300, "rmd": 18385}, {"n": "Ana Rosado", "d": "Customer Service", "e": "Licenciatura", "r": "Customer Care Agent", "vb": 1175, "sa": 224.4, "km": 0, "nk": 0, "vt": 19143, "ns": 1325, "ab": 150, "ta": 21311, "pa": 0.113288, "cm26": 2156, "ca26": 25876, "cm25": 1933, "ca25": 23191, "dm": 224, "da": 2685, "rmn": 17300, "rmd": 18385}, {"n": "Cristina Hermano ", "d": "Customer Service", "e": "Mestrado", "r": "Customer Care Agent", "vb": 1160, "sa": 224.4, "km": 0, "nk": 0, "vt": 18933, "ns": 1210, "ab": 50, "ta": 19701, "pa": 0.040598, "cm26": 1989, "ca26": 23870, "cm25": 1911, "ca25": 22929, "dm": 78, "da": 941, "rmn": 17300, "rmd": 18385}, {"n": "Beatriz Gonçalves", "d": "Customer Service", "e": "Mestrado", "r": "Customer Care Agent", "vb": 950, "sa": 224.4, "km": 0, "nk": 0, "vt": 15993, "ns": 1010, "ab": 60, "ta": 16901, "pa": 0.056816, "cm26": 1698, "ca26": 20381, "cm25": 1605, "ca25": 19266, "dm": 93, "da": 1115, "rmn": 17300, "rmd": 18385}, {"n": "João Mendes", "d": "Customer Service", "e": "12º Ano", "r": "Customer Care Agent", "vb": 1290, "sa": 224.4, "km": 0, "nk": 0, "vt": 20753, "ns": 1290, "ab": 0, "ta": 20821, "pa": 0.003308, "cm26": 2105, "ca26": 25265, "cm25": 2100, "ca25": 25197, "dm": 6, "da": 69, "rmn": 17300, "rmd": 18385}, {"n": "Ana Teresa Fernandes de Moura Soares", "d": "Customer Service", "e": "Licenciatura", "r": "Head of CS", "vb": 1732, "sa": 224.4, "km": 441.61, "nk": 441.61, "vt": 32240, "ns": 1850, "ab": 118, "ta": 33961, "pa": 0.05337, "cm26": 3361, "ca26": 40334, "cm25": 3184, "ca25": 38207, "dm": 177, "da": 2127, "rmn": 29050, "rmd": 30970}, {"n": "Marcos António Petersen Fonseca", "d": "Customer Service", "e": "12º Ano", "r": "Customer Care Agent", "vb": 1130, "sa": 224.4, "km": 0, "nk": 0, "vt": 18513, "ns": 1160, "ab": 30, "ta": 19001, "pa": 0.026395, "cm26": 1916, "ca26": 22998, "cm25": 1867, "ca25": 22406, "dm": 49, "da": 592, "rmn": 17300, "rmd": 18385}, {"n": "Sílvia Cunha", "d": "Data", "e": "Mestrado", "r": "Head of BI", "vb": 2250, "sa": 224.4, "km": 550.0, "nk": 670.0, "vt": 40793, "ns": 2250, "ab": 0, "ta": 42301, "pa": 0.036983, "cm26": 4171, "ca26": 50053, "cm25": 4045, "ca25": 48544, "dm": 126, "da": 1509, "rmn": 35250, "rmd": 37610}, {"n": "Tiago Miguel Carneiro Campos", "d": "Data", "e": "Mestrado", "r": "Data Analyst", "vb": 1850, "sa": 224.4, "km": 0, "nk": 0, "vt": 28593, "ns": 1950, "ab": 100, "ta": 30061, "pa": 0.051364, "cm26": 3065, "ca26": 36779, "cm25": 2914, "ca25": 34966, "dm": 151, "da": 1813, "rmn": 25600, "rmd": 27270}, {"n": "Sara Sousa", "d": "Exec Team", "e": "Mestrado", "r": "COO", "vb": 2350, "sa": 224.4, "km": 705.0, "nk": 1554.17, "vt": 44053, "ns": 2350, "ab": 0, "ta": 44121, "pa": 0.001558, "cm26": 4351, "ca26": 52217, "cm25": 4346, "ca25": 52149, "dm": 6, "da": 69, "rmn": 0, "rmd": 0}, {"n": "Bruno de Gouveia", "d": "Exec Team", "e": "Founder", "r": "Founder", "vb": 4400, "sa": 224.4, "km": 0, "nk": 0, "vt": 64293, "ns": 4400, "ab": 0, "ta": 64361, "pa": 0.001068, "cm26": 6627, "ca26": 79519, "cm25": 6621, "ca25": 79451, "dm": 6, "da": 69, "rmn": 0, "rmd": 0}, {"n": "Jorge Ferreira", "d": "Exec Team", "e": "Founder", "r": "Founder", "vb": 4400, "sa": 224.4, "km": 0, "nk": 0, "vt": 64293, "ns": 4400, "ab": 0, "ta": 64361, "pa": 0.001068, "cm26": 6627, "ca26": 79519, "cm25": 6621, "ca25": 79451, "dm": 6, "da": 69, "rmn": 0, "rmd": 0}, {"n": "André  Silva", "d": "IT", "e": "Licenciatura", "r": "Developer", "vb": 2651, "sa": 224.4, "km": 0, "nk": 0, "vt": 39814, "ns": 2651, "ab": 0, "ta": 39882, "pa": 0.001724, "cm26": 4085, "ca26": 49017, "cm25": 4079, "ca25": 48948, "dm": 6, "da": 69, "rmn": 40900, "rmd": 43670}, {"n": "João  Amaral", "d": "IT", "e": "Mestrado", "r": "Developer", "vb": 2563, "sa": 224.4, "km": 616.6, "nk": 616.6, "vt": 45973, "ns": 2563, "ab": 0, "ta": 46041, "pa": 0.001493, "cm26": 4573, "ca26": 54871, "cm25": 4567, "ca25": 54802, "dm": 6, "da": 69, "rmn": 40900, "rmd": 43670}, {"n": "Moisés Sequeira", "d": "IT", "e": "Licenciatura", "r": "Developer", "vb": 3140, "sa": 224.4, "km": 379.67, "nk": 379.67, "vt": 51209, "ns": 3140, "ab": 0, "ta": 51277, "pa": 0.00134, "cm26": 5175, "ca26": 62095, "cm25": 5169, "ca25": 62026, "dm": 6, "da": 69, "rmn": 40900, "rmd": 43670}, {"n": "Pedro Savi", "d": "IT", "e": "Curso Profissional Superior", "r": "Developer", "vb": 2318, "sa": 224.4, "km": 600.0, "nk": 600.0, "vt": 42349, "ns": 2318, "ab": 0, "ta": 42418, "pa": 0.001621, "cm26": 4200, "ca26": 50405, "cm25": 4195, "ca25": 50336, "dm": 6, "da": 69, "rmn": 40900, "rmd": 43670}, {"n": "Luan Coelho", "d": "IT", "e": "Bacharelato", "r": "Developer", "vb": 2675, "sa": 224.4, "km": 455.0, "nk": 455.0, "vt": 45603, "ns": 2675, "ab": 0, "ta": 45671, "pa": 0.001505, "cm26": 4574, "ca26": 54887, "cm25": 4568, "ca25": 54818, "dm": 6, "da": 69, "rmn": 40900, "rmd": 43670}, {"n": "Carlos Soratto", "d": "IT", "e": "Bacharelato", "r": "Developer", "vb": 2610, "sa": 224.4, "km": 400.0, "nk": 400.0, "vt": 44035, "ns": 2610, "ab": 0, "ta": 44104, "pa": 0.001559, "cm26": 4425, "ca26": 53096, "cm25": 4419, "ca25": 53027, "dm": 6, "da": 69, "rmn": 40900, "rmd": 43670}, {"n": "Vladimiro Oliveira", "d": "IT", "e": "12º Ano", "r": "Systems Administrator", "vb": 2160, "sa": 224.4, "km": 350.0, "nk": 350.0, "vt": 37133, "ns": 2235, "ab": 75, "ta": 38251, "pa": 0.030125, "cm26": 3829, "ca26": 45951, "cm25": 3714, "ca25": 44574, "dm": 115, "da": 1377, "rmn": 34600, "rmd": 36920}, {"n": "Rui Ferreira", "d": "Logística", "e": "Mestrado", "r": "Head of Logistics", "vb": 2166, "sa": 224.4, "km": 0, "nk": 0, "vt": 33013, "ns": 2201, "ab": 35, "ta": 33571, "pa": 0.016922, "cm26": 3429, "ca26": 41153, "cm25": 3373, "ca25": 40473, "dm": 57, "da": 679, "rmn": 30900, "rmd": 32951}, {"n": "Letícia Gonçalves", "d": "Logística", "e": "12º Ano", "r": "Receiving Operator", "vb": 920, "sa": 224.4, "km": 0, "nk": 0, "vt": 15573, "ns": 960, "ab": 40, "ta": 16201, "pa": 0.040368, "cm26": 1626, "ca26": 19509, "cm25": 1562, "ca25": 18742, "dm": 64, "da": 766, "rmn": 15070, "rmd": 15990}, {"n": "André Macedo", "d": "Logística", "e": "12º Ano", "r": "Warehouse Operator", "vb": 920, "sa": 224.4, "km": 0, "nk": 0, "vt": 15573, "ns": 970, "ab": 50, "ta": 16341, "pa": 0.049358, "cm26": 1640, "ca26": 19683, "cm25": 1562, "ca25": 18742, "dm": 78, "da": 941, "rmn": 15070, "rmd": 15990}, {"n": "Mário Noverça", "d": "Logística", "e": "12º Ano", "r": "Shipping Lead", "vb": 1290, "sa": 224.4, "km": 0, "nk": 0, "vt": 20753, "ns": 1320, "ab": 30, "ta": 21241, "pa": 0.023546, "cm26": 2149, "ca26": 25789, "cm25": 2100, "ca25": 25197, "dm": 49, "da": 592, "rmn": 18050, "rmd": 19180}, {"n": "Nuno  Pereira", "d": "Logística", "e": "12º Ano", "r": "Shipping Operator", "vb": 990, "sa": 224.4, "km": 0, "nk": 0, "vt": 16553, "ns": 1020, "ab": 30, "ta": 17041, "pa": 0.02952, "cm26": 1713, "ca26": 20555, "cm25": 1664, "ca25": 19963, "dm": 49, "da": 592, "rmn": 15070, "rmd": 15990}, {"n": "Ana Prior", "d": "Logística", "e": "Licenciatura", "r": "Shipping Operator", "vb": 990, "sa": 224.4, "km": 0, "nk": 0, "vt": 16553, "ns": 1020, "ab": 30, "ta": 17041, "pa": 0.02952, "cm26": 1713, "ca26": 20555, "cm25": 1664, "ca25": 19963, "dm": 49, "da": 592, "rmn": 15070, "rmd": 15990}, {"n": "João Magalhães", "d": "Logística", "e": "12º Ano", "r": "Warehouse Operator", "vb": 920, "sa": 224.4, "km": 0, "nk": 0, "vt": 15573, "ns": 940, "ab": 20, "ta": 15921, "pa": 0.022388, "cm26": 1597, "ca26": 19160, "cm25": 1562, "ca25": 18742, "dm": 35, "da": 418, "rmn": 15070, "rmd": 15990}, {"n": "Francisco Rodrigues", "d": "Logística", "e": "12º Ano", "r": "Shipping Operator", "vb": 920, "sa": 224.4, "km": 0, "nk": 0, "vt": 15573, "ns": 970, "ab": 50, "ta": 16341, "pa": 0.049358, "cm26": 1640, "ca26": 19683, "cm25": 1562, "ca25": 18742, "dm": 78, "da": 941, "rmn": 15070, "rmd": 15990}, {"n": "Hugo Marques", "d": "Logística", "e": "12º Ano", "r": "Warehouse Lead", "vb": 1170, "sa": 224.4, "km": 0, "nk": 0, "vt": 19073, "ns": 1280, "ab": 110, "ta": 20681, "pa": 0.084342, "cm26": 2091, "ca26": 25091, "cm25": 1925, "ca25": 23103, "dm": 166, "da": 1988, "rmn": 18050, "rmd": 19180}, {"n": "Carla Aires", "d": "Logística", "e": "12º Ano", "r": "Shipping Operator", "vb": 940, "sa": 224.4, "km": 0, "nk": 0, "vt": 15853, "ns": 980, "ab": 40, "ta": 16481, "pa": 0.039655, "cm26": 1655, "ca26": 19858, "cm25": 1591, "ca25": 19091, "dm": 64, "da": 766, "rmn": 15070, "rmd": 15990}, {"n": "Sandra Carvalho", "d": "Logística", "e": "12º Ano", "r": "Shipping Operator", "vb": 920, "sa": 224.4, "km": 0, "nk": 0, "vt": 15573, "ns": 970, "ab": 50, "ta": 16341, "pa": 0.049358, "cm26": 1640, "ca26": 19683, "cm25": 1562, "ca25": 18742, "dm": 78, "da": 941, "rmn": 15070, "rmd": 15990}, {"n": "Inês  Leão", "d": "Logística", "e": "12º Ano", "r": "Receiving Operator", "vb": 940, "sa": 224.4, "km": 0, "nk": 0, "vt": 15853, "ns": 1000, "ab": 60, "ta": 16761, "pa": 0.057317, "cm26": 1684, "ca26": 20206, "cm25": 1591, "ca25": 19091, "dm": 93, "da": 1115, "rmn": 15070, "rmd": 15990}, {"n": "Marlene Mota", "d": "Logística", "e": "12º Ano", "r": "Shipping Operator", "vb": 920, "sa": 224.4, "km": 0, "nk": 0, "vt": 15573, "ns": 940, "ab": 20, "ta": 15921, "pa": 0.022388, "cm26": 1597, "ca26": 19160, "cm25": 1562, "ca25": 18742, "dm": 35, "da": 418, "rmn": 15070, "rmd": 15990}, {"n": "Iara Jerónimo", "d": "Marketing", "e": "Mestrado", "r": "Product Specialist & Content Creator", "vb": 1288, "sa": 224.4, "km": 0, "nk": 0, "vt": 20725, "ns": 1318, "ab": 30, "ta": 21213, "pa": 0.023578, "cm26": 2146, "ca26": 25754, "cm25": 2097, "ca25": 25162, "dm": 49, "da": 592, "rmn": 19700, "rmd": 20950}, {"n": "Sílvia Silva", "d": "Marketing", "e": "Licenciatura", "r": "Head of Marketing", "vb": 1900, "sa": 224.4, "km": 380.12, "nk": 415.12, "vt": 33854, "ns": 1935, "ab": 35, "ta": 34833, "pa": 0.028907, "cm26": 3458, "ca26": 41499, "cm25": 3367, "ca25": 40400, "dm": 92, "da": 1099, "rmn": 32200, "rmd": 34350}, {"n": "Sofia Amorim Alves", "d": "Marketing", "e": "Licenciatura", "r": "CRM Specialist", "vb": 1100, "sa": 224.4, "km": 0, "nk": 0, "vt": 18093, "ns": 1128, "ab": 28, "ta": 18553, "pa": 0.02546, "cm26": 1870, "ca26": 22439, "cm25": 1824, "ca25": 21882, "dm": 46, "da": 557, "rmn": 20600, "rmd": 21910}, {"n": "Anistalda Gomes", "d": "Marketing", "e": "Licenciatura", "r": "Community Management & Studio Lead", "vb": 1420, "sa": 224.4, "km": 0, "nk": 0, "vt": 22573, "ns": 1540, "ab": 120, "ta": 24321, "pa": 0.077467, "cm26": 2469, "ca26": 29627, "cm25": 2289, "ca25": 27465, "dm": 180, "da": 2162, "rmn": 21800, "rmd": 23200}, {"n": "Nuno Cristóvão", "d": "Marketing", "e": "Licenciatura", "r": "Digital Performance", "vb": 2110, "sa": 224.4, "km": 0, "nk": 0, "vt": 32233, "ns": 2210, "ab": 100, "ta": 33701, "pa": 0.045564, "cm26": 3443, "ca26": 41315, "cm25": 3292, "ca25": 39502, "dm": 151, "da": 1813, "rmn": 31000, "rmd": 33060}, {"n": "Karina Westermann", "d": "Marketing", "e": "Licenciatura", "r": "Designer", "vb": 1500, "sa": 224.4, "km": 0, "nk": 0, "vt": 23693, "ns": 1540, "ab": 40, "ta": 24321, "pa": 0.026533, "cm26": 2469, "ca26": 29627, "cm25": 2405, "ca25": 28860, "dm": 64, "da": 766, "rmn": 23350, "rmd": 21840}, {"n": "Eliana Fernandes", "d": "Marketing", "e": "Licenciatura", "r": "CRM Specialist", "vb": 1240, "sa": 224.4, "km": 0, "nk": 0, "vt": 20053, "ns": 1280, "ab": 40, "ta": 20681, "pa": 0.031349, "cm26": 2091, "ca26": 25091, "cm25": 2027, "ca25": 24325, "dm": 64, "da": 766, "rmn": 18400, "rmd": 19560}, {"n": "Hugo  Fortes", "d": "Marketing", "e": "Licenciatura", "r": "Creative Content", "vb": 1310, "sa": 224.4, "km": 0, "nk": 0, "vt": 21033, "ns": 1405, "ab": 95, "ta": 22431, "pa": 0.066498, "cm26": 2273, "ca26": 27272, "cm25": 2129, "ca25": 25546, "dm": 144, "da": 1726, "rmn": 19960, "rmd": 18690}, {"n": "Diogo Gomes", "d": "Marketing", "e": "Licenciatura", "r": "Designer", "vb": 1200, "sa": 224.4, "km": 0, "nk": 0, "vt": 19493, "ns": 1235, "ab": 35, "ta": 20051, "pa": 0.028659, "cm26": 2026, "ca26": 24306, "cm25": 1969, "ca25": 23627, "dm": 57, "da": 679, "rmn": 18600, "rmd": 19770}, {"n": "Rita Saraiva ", "d": "Marketing", "e": "Licenciatura", "r": "Marketing Specialist", "vb": 1370, "sa": 224.4, "km": 0, "nk": 0, "vt": 21873, "ns": 1405, "ab": 35, "ta": 22431, "pa": 0.02554, "cm26": 2273, "ca26": 27272, "cm25": 2216, "ca25": 26592, "dm": 57, "da": 679, "rmn": 18720, "rmd": 19900}, {"n": "Patrícia Correia", "d": "Marketing", "e": "Mestrado", "r": "UX/UI Designer", "vb": 1500, "sa": 224.4, "km": 0, "nk": 0, "vt": 23693, "ns": 1540, "ab": 40, "ta": 24321, "pa": 0.026533, "cm26": 2469, "ca26": 29627, "cm25": 2405, "ca25": 28860, "dm": 64, "da": 766, "rmn": 22600, "rmd": 24060}, {"n": "Elsa Cardoso", "d": "Portugal Internet", "e": "Licenciatura", "r": "Head of PI", "vb": 1610, "sa": 224.4, "km": 0, "nk": 0, "vt": 25233, "ns": 1610, "ab": 0, "ta": 25301, "pa": 0.00272, "cm26": 2571, "ca26": 30848, "cm25": 2565, "ca25": 30779, "dm": 6, "da": 69, "rmn": 20900, "rmd": 22230}, {"n": "Luís Vieira", "d": "Portugal Internet", "e": "Bacharelato", "r": "Customer Care Agent", "vb": 1175, "sa": 224.4, "km": 0, "nk": 0, "vt": 19143, "ns": 1175, "ab": 0, "ta": 19211, "pa": 0.003586, "cm26": 1938, "ca26": 23259, "cm25": 1933, "ca25": 23191, "dm": 6, "da": 69, "rmn": 17300, "rmd": 18385}, {"n": "Daniel Yaguas", "d": "Recursos Humanos", "e": "Mestrado", "r": "Head of People", "vb": 1978, "sa": 224.4, "km": 500.0, "nk": 578.0, "vt": 36385, "ns": 2000, "ab": 22, "ta": 37697, "pa": 0.036077, "cm26": 3716, "ca26": 44587, "cm25": 3600, "ca25": 43199, "dm": 116, "da": 1388, "rmn": 33200, "rmd": 35420}];

const DEPT_COLORS = {
  "Compras": "#2563eb", "Conteúdos": "#7c3aed", "Customer Service": "#db2777",
  "Data": "#059669", "Exec Team": "#dc2626", "IT": "#0891b2",
  "Logística": "#d97706", "Marketing": "#4f46e5", "Portugal Internet": "#0d9488",
  "Recursos Humanos": "#be185d"
};

const fmt = (n) => new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const fmtK = (n) => `€${(n/1000).toFixed(0)}k`;
const pct = (n) => `${(n*100).toFixed(1)}%`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 14px', color: '#e0e0e0', fontSize: 12 }}>
      <p style={{ fontWeight: 600, marginBottom: 4, color: '#fff' }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, margin: '2px 0' }}>{p.name}: {typeof p.value === 'number' && p.value > 100 ? fmt(p.value) : p.value}</p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [selectedDept, setSelectedDept] = useState("All");
  const [view, setView] = useState("overview");
  const [headsOnly, setHeadsOnly] = useState(false);
  const [teamsLink, setTeamsLink] = useState("https://caretobeautycom.sharepoint.com/:x:/s/RHJB/IQBbBCnVGgDDR7i_mzw-BUubAbsnyXfcPTWrhSBrRCGJEZA?e=6b5K7Y");
  const [sortCol, setSortCol] = useState("pa");
  const [sortDir, setSortDir] = useState("desc");
  const [lastSync, setLastSync] = useState(null);
  const [fileName, setFileName] = useState("calibração (embedded)");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const RAW = data;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const wb = XLSX.read(new Uint8Array(evt.target!.result as ArrayBuffer), { type: 'array' });
        const names = wb.SheetNames.map(s => s.toLowerCase());
        const idx = names.findIndex(s => s.includes('calibra'));
        const idx2 = idx >= 0 ? idx : (names.findIndex(s => s.includes('all team')) >= 0 ? names.findIndex(s => s.includes('all team')) : 0);
        const sheet = wb.Sheets[wb.SheetNames[idx2]];
        const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });
        const employees: any[] = [];
        let lastDept = '';
        const sf = (v: any) => (v != null && !isNaN(Number(v))) ? Number(v) : 0;
        for (let i = 2; i < rows.length; i++) {
          const r = rows[i];
          if (!r || !r[4]) continue;
          const dept = r[2] || lastDept;
          if (r[2]) lastDept = r[2];
          const emp = {
            n: String(r[4] || '').trim(), d: String(dept).trim(),
            e: String(r[3] || '').trim(), r: String(r[5] || '').trim(),
            vb: sf(r[8]), sa: sf(r[9]), km: sf(r[10]), nk: sf(r[23]),
            ns: sf(r[22]), ab: sf(r[24]), pa: sf(r[29]),
            cm26: sf(r[37]), ca26: sf(r[38]), cm25: sf(r[39]), ca25: sf(r[40]),
            dm: sf(r[41]), da: sf(r[42]), rmn: sf(r[12]), rmd: sf(r[13]),
          };
          if (emp.n && emp.vb > 0) employees.push(emp);
        }
        if (employees.length === 0) throw new Error("No data found");
        setData(employees);
        setLastSync(new Date());
        setFileName(file.name + " (" + employees.length + ")");
      } catch (err: any) {
        setUploadError(err.message);
      }
      setUploading(false);
    };
    reader.onerror = () => { setUploadError("Failed to read file"); setUploading(false); };
    reader.readAsArrayBuffer(file);
    e.target.value = '';
  };

  const isHead = (e) => /^Head of|^COO$|^Founder$/i.test(e.r);
  const depts = useMemo(() => [...new Set(RAW.map(e => e.d))].sort(), [RAW]);
  const filtered = useMemo(() => {
    let data = selectedDept === "All" ? RAW : RAW.filter(e => e.d === selectedDept);
    if (headsOnly) data = data.filter(isHead);
    return data;
  }, [selectedDept, headsOnly, RAW]);

  // Exclude Exec Team from non-exec calculations
  const nonExec = useMemo(() => RAW.filter(e => e.d !== "Exec Team"), [RAW]);

  const totalKms = useMemo(() => filtered.reduce((s, e) => s + (e.nk || e.km || 0), 0), [filtered]);

  const totalCusto2026 = useMemo(() => filtered.reduce((s, e) => s + e.ca26, 0), [filtered]);
  const totalCusto2025 = useMemo(() => filtered.reduce((s, e) => s + e.ca25, 0), [filtered]);
  const totalDiff = totalCusto2026 - totalCusto2025;
  const avgRaise = useMemo(() => {
    const f = filtered.filter(e => e.d !== "Exec Team");
    return f.length ? f.reduce((s, e) => s + e.pa, 0) / f.length : 0;
  }, [filtered]);
  const avgBase = useMemo(() => filtered.reduce((s, e) => s + e.vb, 0) / filtered.length, [filtered]);
  const avgNovo = useMemo(() => filtered.reduce((s, e) => s + e.ns, 0) / filtered.length, [filtered]);

  const deptData = useMemo(() => depts.map(d => {
    const emps = RAW.filter(e => e.d === d);
    return {
      dept: d, short: d.substring(0, 8),
      count: emps.length,
      avgBase: Math.round(emps.reduce((s, e) => s + e.vb, 0) / emps.length),
      avgNovo: Math.round(emps.reduce((s, e) => s + e.ns, 0) / emps.length),
      totalCusto26: Math.round(emps.reduce((s, e) => s + e.ca26, 0)),
      totalCusto25: Math.round(emps.reduce((s, e) => s + e.ca25, 0)),
      avgPct: emps.reduce((s, e) => s + e.pa, 0) / emps.length,
      totalDiff: Math.round(emps.reduce((s, e) => s + e.da, 0)),
      totalKms: Math.round(emps.reduce((s, e) => s + (e.nk || e.km || 0), 0)),
      kmsCount: emps.filter(e => (e.nk || e.km) > 0).length,
    };
  }), [depts, RAW]);

  const eduData = useMemo(() => {
    const map = {};
    filtered.forEach(e => { map[e.e] = (map[e.e] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [filtered]);

  const eduColors = ["#2563eb", "#7c3aed", "#db2777", "#059669", "#d97706", "#dc2626"];

  const tabs = [
    { id: "overview", label: "Visão Geral" },
    { id: "departments", label: "Departamentos" },
    { id: "employees", label: "Colaboradores" },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)', color: '#e0e0e0', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>

      {/* Header */}
      <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0, fontFamily: "'Space Mono', monospace", letterSpacing: -1 }}>
              C2B <span style={{ color: '#2563eb' }}>Salary Benchmark</span> 2026
            </h1>
            <p style={{ color: '#888', fontSize: 13, margin: '4px 0 0' }}>{filtered.length} colaboradores · {headsOnly ? 'Heads of Department' : '10 departamentos'} · <span style={{ color: '#d97706' }}>fonte: calibração</span></p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setView(t.id)}
                style={{
                  padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: view === t.id ? '#2563eb' : 'rgba(255,255,255,0.06)',
                  color: view === t.id ? '#fff' : '#aaa',
                  fontSize: 13, fontWeight: 600, transition: 'all 0.2s'
                }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Data Source */}
        <div style={{
          marginTop: 14, background: 'rgba(255,255,255,0.03)', borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.06)', padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="18" rx="3" fill="#185ABD" /><text x="7" y="16" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">X</text></svg>
            <span style={{ color: '#888', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Source <span style={{ color: '#d97706', fontWeight: 700 }}>· calibração</span>
            </span>
          </div>

          <label style={{
            padding: '7px 16px', borderRadius: 8, border: '2px dashed rgba(37,99,235,0.4)',
            cursor: uploading ? 'wait' : 'pointer',
            background: 'rgba(37,99,235,0.06)', color: '#60a5fa',
            fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
          }}>
            <span style={{ fontSize: 14 }}>{uploading ? '⏳' : '📂'}</span>
            {uploading ? 'Processing…' : 'Upload .xlsx'}
            <input type="file" accept=".xlsx,.xls" onChange={handleFile} disabled={uploading} style={{ display: 'none' }} />
          </label>

          {teamsLink && (
            <a href={teamsLink} target="_blank" rel="noopener noreferrer"
              style={{ padding: '7px 12px', borderRadius: 8, background: '#185ABD', color: '#fff', fontSize: 11, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
              ↗ Open in Teams
            </a>
          )}

          <div style={{ flex: 1, minWidth: 150, position: 'relative' }}>
            <input type="text" value={teamsLink} onChange={(e) => setTeamsLink(e.target.value)}
              placeholder="Teams / SharePoint link…"
              style={{ width: '100%', padding: '7px 28px 7px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#e0e0e0', fontSize: 11, fontFamily: "'DM Sans', sans-serif", outline: 'none', boxSizing: 'border-box' }} />
            {teamsLink && <button onClick={() => setTeamsLink('')} style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 12 }}>✕</button>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ color: '#059669', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669', display: 'inline-block' }} />
              {fileName}
            </span>
            {lastSync && <span style={{ color: '#555', fontSize: 10 }}>Updated: {lastSync.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })} · {RAW.length} employees</span>}
            {uploadError && <span style={{ color: '#ef4444', fontSize: 11 }}>⚠ {uploadError}</span>}
          </div>
        </div>

        {/* Department filter */}
        <div style={{ display: 'flex', gap: 6, marginTop: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setHeadsOnly(!headsOnly)}
            style={{
              padding: '5px 14px', borderRadius: 20, border: headsOnly ? '2px solid #f59e0b' : '2px solid rgba(255,255,255,0.1)', cursor: 'pointer',
              background: headsOnly ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
              color: headsOnly ? '#f59e0b' : '#999', fontSize: 12, fontWeight: 600, letterSpacing: 0.3,
              display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s'
            }}>
            <span style={{ fontSize: 14 }}>👑</span> Heads of Department
          </button>
          <span style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
          <button onClick={() => setSelectedDept("All")}
            style={{
              padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: selectedDept === "All" ? '#2563eb' : 'rgba(255,255,255,0.08)',
              color: selectedDept === "All" ? '#fff' : '#999', fontSize: 12, fontWeight: 500
            }}>Todos</button>
          {depts.map(d => (
            <button key={d} onClick={() => setSelectedDept(d)}
              style={{
                padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer',
                background: selectedDept === d ? DEPT_COLORS[d] : 'rgba(255,255,255,0.08)',
                color: selectedDept === d ? '#fff' : '#999', fontSize: 12, fontWeight: 500
              }}>{d}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '24px 32px' }}>
        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Custo Empresa 2026', value: fmtK(totalCusto2026), sub: `2025: ${fmtK(totalCusto2025)}` },
            { label: 'Diferença Anual', value: fmtK(totalDiff), sub: `+${((totalDiff/totalCusto2025)*100).toFixed(1)}% vs 2025`, accent: '#059669' },
            { label: 'Aumento Médio', value: pct(avgRaise), sub: 'excl. Exec Team', accent: '#7c3aed' },
            { label: 'Salário Base Médio', value: fmt(avgBase), sub: `Novo: ${fmt(avgNovo)}` },
            { label: 'Colaboradores', value: filtered.length, sub: headsOnly ? '👑 Heads only' : selectedDept === "All" ? '10 departamentos' : selectedDept },
            { label: 'Total KMs / Mês', value: fmt(totalKms), sub: `${filtered.filter(e => (e.nk || e.km) > 0).length} com subsídio KM`, accent: '#d97706' },
          ].map((kpi, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '20px',
              border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)'
            }}>
              <p style={{ color: '#888', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, margin: 0, fontWeight: 600 }}>{kpi.label}</p>
              <p style={{ fontSize: 26, fontWeight: 700, color: kpi.accent || '#fff', margin: '8px 0 4px', fontFamily: "'Space Mono', monospace" }}>{kpi.value}</p>
              <p style={{ color: '#666', fontSize: 12, margin: 0 }}>{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Overview View */}
        {view === "overview" && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Cost by Department */}
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 20, border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: '0 0 16px' }}>Custo Anual por Departamento</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={deptData.filter(d => d.dept !== "Exec Team")} margin={{ left: 10, right: 10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="short" tick={{ fill: '#888', fontSize: 10 }} angle={-30} textAnchor="end" />
                  <YAxis tick={{ fill: '#888', fontSize: 10 }} tickFormatter={v => `€${(v/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="totalCusto25" name="2025" fill="rgba(255,255,255,0.15)" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="totalCusto26" name="2026" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Average Raise by Dept */}
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 20, border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: '0 0 16px' }}>Aumento Médio por Departamento</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={deptData.sort((a, b) => b.avgPct - a.avgPct)} layout="vertical" margin={{ left: 80, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" tick={{ fill: '#888', fontSize: 10 }} tickFormatter={v => `${(v*100).toFixed(0)}%`} />
                  <YAxis type="category" dataKey="dept" tick={{ fill: '#ccc', fontSize: 11 }} width={75} />
                  <Tooltip content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 14px', color: '#e0e0e0', fontSize: 12 }}>
                        <p style={{ fontWeight: 600, color: '#fff' }}>{payload[0]?.payload?.dept}</p>
                        <p>Aumento: {pct(payload[0]?.value)}</p>
                        <p>{payload[0]?.payload?.count} colaboradores</p>
                      </div>
                    );
                  }} />
                  <Bar dataKey="avgPct" fill="#7c3aed" radius={[0, 6, 6, 0]}>
                    {deptData.map((d, i) => (
                      <Cell key={i} fill={DEPT_COLORS[d.dept] || '#7c3aed'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Education Distribution */}
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 20, border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: '0 0 16px' }}>Habilitações Académicas</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={eduData} cx="50%" cy="50%" innerRadius={60} outerRadius={110} paddingAngle={3} dataKey="value">
                    {eduData.map((_, i) => <Cell key={i} fill={eduColors[i % eduColors.length]} />)}
                  </Pie>
                  <Tooltip content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '10px 14px', color: '#e0e0e0', fontSize: 12 }}>
                        <p style={{ fontWeight: 600, color: '#fff' }}>{payload[0]?.name}</p>
                        <p>{payload[0]?.value} colaboradores</p>
                      </div>
                    );
                  }} />
                  <Legend formatter={(v) => <span style={{ color: '#ccc', fontSize: 11 }}>{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Headcount by Department */}
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 20, border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: '0 0 16px' }}>Salário Base: Atual vs Proposto</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={deptData.filter(d => d.dept !== "Exec Team")} margin={{ left: 10, right: 10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="short" tick={{ fill: '#888', fontSize: 10 }} angle={-30} textAnchor="end" />
                  <YAxis tick={{ fill: '#888', fontSize: 10 }} tickFormatter={v => `€${v}`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="avgBase" name="Base Atual" fill="rgba(255,255,255,0.15)" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="avgNovo" name="Base Proposto" fill="#059669" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Departments View */}
        {view === "departments" && (
          <div style={{ display: 'grid', gap: 16 }}>
            {deptData.map(d => {
              const emps = RAW.filter(e => e.d === d.dept);
              const topRaise = [...emps].sort((a, b) => b.pa - a.pa)[0];
              return (
                <div key={d.dept} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 20, border: '1px solid rgba(255,255,255,0.06)', borderLeft: `4px solid ${DEPT_COLORS[d.dept]}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: 0 }}>{d.dept}</h3>
                      <p style={{ color: '#888', fontSize: 12, margin: '4px 0 0' }}>{d.count} colaboradores</p>
                    </div>
                    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ color: '#888', fontSize: 10, margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>Custo 2026</p>
                        <p style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: 0, fontFamily: "'Space Mono', monospace" }}>{fmtK(d.totalCusto26)}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ color: '#888', fontSize: 10, margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>Diferença</p>
                        <p style={{ color: '#059669', fontSize: 18, fontWeight: 700, margin: 0, fontFamily: "'Space Mono', monospace" }}>+{fmtK(d.totalDiff)}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ color: '#888', fontSize: 10, margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>Aumento Médio</p>
                        <p style={{ color: '#7c3aed', fontSize: 18, fontWeight: 700, margin: 0, fontFamily: "'Space Mono', monospace" }}>{pct(d.avgPct)}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ color: '#888', fontSize: 10, margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>Maior Aumento</p>
                        <p style={{ color: '#db2777', fontSize: 14, fontWeight: 600, margin: 0 }}>{topRaise?.n} ({pct(topRaise?.pa)})</p>
                      </div>
                      {d.totalKms > 0 && (
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ color: '#888', fontSize: 10, margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>KMs / Mês</p>
                          <p style={{ color: '#d97706', fontSize: 18, fontWeight: 700, margin: 0, fontFamily: "'Space Mono', monospace" }}>{fmt(d.totalKms)}</p>
                          <p style={{ color: '#666', fontSize: 10, margin: 0 }}>{d.kmsCount} colaboradores</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Mini bar for each employee */}
                  <div style={{ marginTop: 16, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {emps.sort((a, b) => b.pa - a.pa).map((e, i) => (
                      <div key={i} title={`${e.n}: ${pct(e.pa)}`}
                        style={{
                          height: 28, width: Math.max(20, (e.pa / (topRaise?.pa || 0.1)) * 80),
                          background: `${DEPT_COLORS[d.dept]}${Math.round(30 + (e.pa / (topRaise?.pa || 0.1)) * 70).toString(16).padStart(2, '0')}`,
                          borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 9, color: 'rgba(255,255,255,0.8)', cursor: 'default', overflow: 'hidden', whiteSpace: 'nowrap', padding: '0 4px'
                        }}>
                        {e.n.split(' ')[0]}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Employees View */}
        {view === "employees" && (() => {
          const columns = [
            { key: 'n', label: 'Nome', type: 'str' },
            { key: 'd', label: 'Departamento', type: 'str' },
            { key: 'r', label: 'Função', type: 'str' },
            { key: 'vb', label: 'Base Atual', type: 'num' },
            { key: 'km', label: 'KMs', type: 'num' },
            { key: 'nk', label: 'Novo KMs', type: 'num' },
            { key: 'ns', label: 'Base Novo', type: 'num' },
            { key: '_total', label: 'Total', type: 'num' },
            { key: '_aumento', label: 'Aumento', type: 'num' },
            { key: 'pa', label: '%', type: 'num' },
            { key: 'ca26', label: 'Custo 2026', type: 'num' },
            { key: 'ca25', label: 'Custo 2025', type: 'num' },
            { key: 'da', label: 'Δ Anual', type: 'num' },
          ];
          const handleSort = (key) => {
            if (sortCol === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
            else { setSortCol(key); setSortDir('desc'); }
          };
          const getVal = (e, key) => {
            if (key === '_total') return e.ns + (e.nk || e.km || 0);
            if (key === '_aumento') return e.ab + ((e.nk || 0) - (e.km || 0));
            if (key === 'nk') return e.nk || e.km || 0;
            return e[key];
          };
          const sorted = [...filtered].sort((a, b) => {
            const col = columns.find(c => c.key === sortCol);
            if (!col) return 0;
            let va = getVal(a, sortCol), vb2 = getVal(b, sortCol);
            if (col.type === 'str') {
              va = (va || '').toLowerCase(); vb2 = (vb2 || '').toLowerCase();
              return sortDir === 'asc' ? va.localeCompare(vb2) : vb2.localeCompare(va);
            }
            return sortDir === 'asc' ? (va || 0) - (vb2 || 0) : (vb2 || 0) - (va || 0);
          });
          return (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 4px', fontSize: 12 }}>
              <thead>
                <tr>
                  {columns.map(col => (
                    <th key={col.key}
                      onClick={() => handleSort(col.key)}
                      style={{
                        padding: '10px 12px', textAlign: 'left', color: sortCol === col.key ? '#2563eb' : '#888',
                        fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600,
                        borderBottom: `2px solid ${sortCol === col.key ? '#2563eb' : 'rgba(255,255,255,0.08)'}`,
                        cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap', transition: 'all 0.15s',
                      }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        {col.label}
                        <span style={{ display: 'inline-flex', flexDirection: 'column', fontSize: 8, lineHeight: 1, opacity: sortCol === col.key ? 1 : 0.3 }}>
                          <span style={{ color: sortCol === col.key && sortDir === 'asc' ? '#2563eb' : '#666' }}>▲</span>
                          <span style={{ color: sortCol === col.key && sortDir === 'desc' ? '#2563eb' : '#666' }}>▼</span>
                        </span>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((e, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <td style={{ padding: '10px 12px', color: '#fff', fontWeight: 500 }}>{e.n}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ background: DEPT_COLORS[e.d] + '30', color: DEPT_COLORS[e.d], padding: '2px 8px', borderRadius: 12, fontSize: 11 }}>{e.d}</span>
                    </td>
                    <td style={{ padding: '10px 12px', color: '#aaa', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.r}</td>
                    <td style={{ padding: '10px 12px', fontFamily: "'Space Mono', monospace", color: '#aaa' }}>{fmt(e.vb)}</td>
                    <td style={{ padding: '10px 12px', fontFamily: "'Space Mono', monospace", color: e.km > 0 ? '#d97706' : '#444' }}>{e.km > 0 ? fmt(e.km) : '—'}</td>
                    <td style={{ padding: '10px 12px', fontFamily: "'Space Mono', monospace", color: (e.nk || 0) > e.km ? '#f59e0b' : (e.nk || e.km) > 0 ? '#d97706' : '#444', fontWeight: (e.nk || 0) > e.km ? 600 : 400 }}>{(e.nk || e.km) > 0 ? fmt(e.nk || e.km) : '—'}{(e.nk || 0) > e.km ? ' ↑' : ''}</td>
                    <td style={{ padding: '10px 12px', fontFamily: "'Space Mono', monospace", color: '#fff', fontWeight: 600 }}>{fmt(e.ns)}</td>
                    <td style={{ padding: '10px 12px', fontFamily: "'Space Mono', monospace", color: '#22d3ee', fontWeight: 700 }}>{fmt(e.ns + (e.nk || e.km || 0))}</td>
                    {(() => { const kmDiff = (e.nk || 0) - (e.km || 0); const totalAum = e.ab + kmDiff; return (
                    <td style={{ padding: '10px 12px', fontFamily: "'Space Mono', monospace", color: totalAum > 0 ? '#059669' : '#666' }}>
                      {totalAum > 0 ? `+${fmt(totalAum)}` : '—'}
                      {kmDiff > 0 && <span style={{ color: '#d97706', fontSize: 10, marginLeft: 4 }}>({fmt(kmDiff)} km)</span>}
                    </td>); })()}
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{
                        background: e.pa > 0.08 ? '#059669' : e.pa > 0.03 ? '#2563eb' : 'rgba(255,255,255,0.08)',
                        color: '#fff', padding: '3px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600
                      }}>{pct(e.pa)}</span>
                    </td>
                    <td style={{ padding: '10px 12px', fontFamily: "'Space Mono', monospace" }}>{fmtK(e.ca26)}</td>
                    <td style={{ padding: '10px 12px', fontFamily: "'Space Mono', monospace", color: '#888' }}>{fmtK(e.ca25)}</td>
                    <td style={{ padding: '10px 12px', fontFamily: "'Space Mono', monospace", color: '#059669', fontWeight: 600 }}>{e.da > 0 ? `+${fmt(e.da)}` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          );
        })()}
      </div>
    </div>
  );
}
